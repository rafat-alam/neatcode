import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { spawn } from 'child_process';
import path from 'path';
import { performance } from 'perf_hooks';
import { randomUUID } from 'crypto';

export const POST = async (req: Request) => {
  const uniqueId = randomUUID();
  const className = `Main_${uniqueId.replace(/-/g, '')}`; // Java class must match file name
  const javaFilePath = path.join(process.cwd(), `${className}.java`);
  const memoryUsedKb = 'N/A'; // placeholder

  try {
    const body = await req.json();
    const { code, input } = body;

    // Replace class name with generated one
    const updatedCode = code.replace(/public\s+class\s+\w+/, `public class ${className}`);
    
    await writeFile(javaFilePath, updatedCode);

    // Compile Java
    await new Promise((resolve, reject) => {
      const compile = spawn('javac', [javaFilePath]);
      let compileError = '';
      compile.stderr.on('data', data => compileError += data.toString());
      compile.on('close', code => {
        if (code !== 0) reject(compileError);
        else resolve(true);
      });
    });

    // Execute Java class
    const startTime = performance.now();

    const run = spawn('java', ['-cp', process.cwd(), className]);
    if (input) run.stdin.write(input);
    run.stdin.end();

    let output = '';
    let errorOutput = '';

    run.stdout.on('data', data => output += data.toString());
    run.stderr.on('data', data => errorOutput += data.toString());

    await new Promise(resolve => run.on('close', resolve));

    const endTime = performance.now();
    const runtimeMs = endTime - startTime;

    if (errorOutput) {
      return NextResponse.json({ error: errorOutput.trim() }, { status: 200 });
    }

    return NextResponse.json({
      error: "",
      output: output.trim(),
      runtime: runtimeMs.toFixed(2),
      memory: memoryUsedKb
    }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: err }, {status : 200});
  } finally {
    await Promise.all([
      unlink(javaFilePath).catch(() => {}),
      unlink(path.join(process.cwd(), `${className}.class`)).catch(() => {})
    ]);
  }
};

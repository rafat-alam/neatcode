import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { spawn } from 'child_process';
import path from 'path';
import { performance } from 'perf_hooks';
import { unlink } from 'fs/promises';
import { randomUUID } from 'crypto';

export const POST = async (req: Request) => {
  const body = await req.json();
  const { code, input } = body;
  const uniqueId = randomUUID();
  const cppFilePath = path.join(process.cwd(), `temp_${uniqueId}.cpp`);
  const exeFilePath = path.join(process.cwd(), `temp_${uniqueId}.exe`);
  
  try {
    await writeFile(cppFilePath, code);

    // Compile the code
    await new Promise((resolve, reject) => {
      const compile = spawn('g++', [cppFilePath, '-o', exeFilePath]);
      let compileError = '';

      compile.stderr.on('data', (data) => compileError += data.toString());
      compile.on('close', (code) => {
        if (code !== 0) reject(compileError);
        else resolve(true);
      });
    });

    // Start timer
    const startTime = performance.now();

    // Run executable
    const run = spawn(exeFilePath);
    if (input) run.stdin.write(input);
    run.stdin.end();

    let output = '';
    run.stdout.on('data', (data) => output += data.toString());

    await new Promise((resolve) => run.on('close', resolve));

    const endTime = performance.now();
    const runtimeMs = endTime - startTime;

    // Approximate memory usage (only accurate on Linux/WSL with /usr/bin/time -v)
    // You can replace this with a proper library for Windows
    const memoryUsedKb = 'N/A'; // Placeholder

    return NextResponse.json({
      error: "",
      output: output.trim(),
      runtime: runtimeMs.toFixed(2),
      memory: memoryUsedKb
    });

  } catch (err) {
    return NextResponse.json({ error: err});
  } finally {
    await Promise.all([
      unlink(cppFilePath).catch(() => {}),
      unlink(exeFilePath).catch(() => {})
    ]);
  }
};

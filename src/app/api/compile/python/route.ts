import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { spawn } from 'child_process';
import path from 'path';
import { performance } from 'perf_hooks';
import { randomUUID } from 'crypto';

export const POST = async (req: Request) => {
  const body = await req.json();
  const { code, input } = body;
  const uniqueId = randomUUID();
  const filePath = path.join(process.cwd(), `temp_${uniqueId}.py`);
  const memoryUsedKb = 'N/A'; // placeholder

  try {
    await writeFile(filePath, code);

    const startTime = performance.now();

    const run = spawn('python', [filePath]); // use 'python3' if required

    if (input) run.stdin.write(input);
    run.stdin.end();

    let output = '';
    let errorOutput = '';

    run.stdout.on('data', (data) => output += data.toString());
    run.stderr.on('data', (data) => errorOutput += data.toString());

    await new Promise((resolve) => run.on('close', resolve));

    const endTime = performance.now();
    const runtimeMs = endTime - startTime;

    if (errorOutput) {
      return NextResponse.json({ error: errorOutput.trim() });
    }

    return NextResponse.json({
      error: "",
      output: output.trim(),
      runtime: runtimeMs.toFixed(2),
      memory: memoryUsedKb
    });

  } catch (err) {
    return NextResponse.json({ error: err });
  } finally {
    await unlink(filePath).catch(() => {});
  }
};

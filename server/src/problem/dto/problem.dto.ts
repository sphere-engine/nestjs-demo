export class TestProblemsResponseDto {
    message: string;
}

export class CreateProblemDto {
    readonly problemId: number;
    readonly source: string;
    readonly compilerId: number;
}

export class CreateProblemResponseDto {
    readonly id: string;
}

export class GetProblemDto {
    id: number;
    executing: boolean;
    date: string;
    compiler: Compiler;
    problem: Problem;
    result: Result;
}

export interface Compiler {
    id: number;
    name: string;
    version: Version;
}

export interface Version {
    id: number;
    name: string;
}

export interface Problem {
    id: number;
    code: string;
    name: string;
    uri: string;
}

export interface Result {
    status: Status;
    time: number;
    memory: number;
    signal: number;
    signal_desc: string;
    streams: Streams;
}

export interface Status {
    code: number;
    name: string;
}

export interface Streams {
    source: Source;
    input: Input;
    output: Output;
    error: any;
    cmpinfo: any;
}

export interface Source {
    size: number;
    uri: string;
}

export interface Input {
    size: number;
    uri: string;
}

export interface Output {
    size: number;
    uri: string;
}
  
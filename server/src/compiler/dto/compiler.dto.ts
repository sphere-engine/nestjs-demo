export class CreateCompilerResponseDto {
  readonly id: string;
}

export class CreateCompilerDto {
  readonly compilerId: number;
  readonly source: string;
}

export class GetCompilerDto {
  id: number;
  executing: boolean;
  date: string;
  compiler: Compiler;
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

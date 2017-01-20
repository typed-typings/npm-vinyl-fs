
import File = require('vinyl');
import * as globStream from 'glob-stream';
import * as through from 'through2';
import {EventEmitter} from "events";

export interface WatchFunction {
    (globs: string|string[], cb?: (outEvt: { type: any; path: any; old: any; }) => void): EventEmitter;
    (globs: string|string[], opt?: { interval?: number; debounceDelay?: number; cwd?: string; maxListeners?: Function; }, cb?: (outEvt: { type: any; path: any; old: any; }) => void): EventEmitter;
}

/**
 * watches all files in the glob and runs the given callback as soon as a change to one of the watched files occurs.
 */
export declare let watch: WatchFunction;

interface SrcOptions extends globStream.Options, through.Options {

    /** Specifies the working directory the folder is relative to */
    cwd?: string;

    /**
     * Specifies the folder relative to the cwd
     * This is used to determine the file names when saving in .dest()
     * Default is where the glob begins
     */
    base?: string;

    /**
     * Setting this to false will make file.contents a paused stream
     * If true it will buffer the file contents
     * Defaults to true
     */
    buffer?: boolean;

    /**
     * Setting this to false will ignore the contents of the file and disable writing to disk to speed up operations
     * Defaults to true
     */
    read?: boolean;

    /**  Only find files that have been modified since the time specified */
    since?: Date | number;

    /**
     * Setting this to true will create a duplex stream, one that passes through items and emits globbed files.
     * Defaults to false
     */
    passthrough?: boolean;

    /**
     * Setting this to true will enable sourcemaps.
     * Defaults to false
     */
    sourcemaps?: boolean;
}

/**
 * Gets files that match the glob and converts them into the vinyl format
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * Globs are executed in order, so negations should follow positive globs
 * fs.src(['!b*.js', '*.js']) would not exclude any files, but this would: fs.src(['*.js', '!b*.js'])
 * @param opt Options Vinyl source options, changes the way the files are read, found, or stored in the vinyl stream
 */
export function src(globs: string | string[], options?: SrcOptions): NodeJS.ReadWriteStream;

export interface DestOptions {
    /**
     * Specify the working directory the folder is relative to
     * Default is process.cwd()
     */
    cwd?: string;

    /**
     * Specify the mode the files should be created with
     * Default is the mode of the input file (file.stat.mode)
     * or the process mode if the input file has no mode property
     */
    mode?: number | string;

    /** Specify the mode the directory should be created with. Default is the process mode */
    dirMode?: number | string;

    /** Specify if existing files with the same path should be overwritten or not. Default is true, to always overwrite existing files */
    overwrite?: boolean;
}

/**
 * On write the stream will save the vinyl File to disk at the folder/cwd specified.
 * After writing the file to disk, it will be emitted from the stream so you can keep piping these around.
 * The file will be modified after being written to this stream:
 * cwd, base, and path will be overwritten to match the folder
 * stat.mode will be overwritten if you used a mode parameter
 * contents will have it's position reset to the beginning if it is a stream
 * @param folder destination folder
 */
export function dest(folder: string, options?: DestOptions): NodeJS.ReadWriteStream;

/**
 * On write the stream will save the vinyl File to disk at the folder/cwd specified.
 * After writing the file to disk, it will be emitted from the stream so you can keep piping these around.
 * The file will be modified after being written to this stream:
 * cwd, base, and path will be overwritten to match the folder
 * stat.mode will be overwritten if you used a mode parameter
 * contents will have it's position reset to the beginning if it is a stream
 * @param getFolderPath function that takes in a file and returns a folder path
 */
export function dest(getFolderPath: (file: File) => string): NodeJS.ReadWriteStream;

export interface SymlinkOptions {

    /**
     * Specify the working directory the folder is relative to
     * Default is process.cwd()
     */
    cwd?: string;

    /** Specify the mode the directory should be created with. Default is the process mode */
    mode?: number | string;

    /**
     * Specify the mode the directory should be created with
     * Default is the process mode
     */
    dirMode?: number;
}

/**
 * On write the stream will create a symbolic link (i.e. symlink) on disk at the folder/cwd specified.
 * After creating the symbolic link, it will be emitted from the stream so you can keep piping these around.
 * The file will be modified after being written to this stream:
 * cwd, base, and path will be overwritten to match the folder
 */
export function symlink(folder: string, opts?: SymlinkOptions): NodeJS.ReadWriteStream;

/**
 * On write the stream will create a symbolic link (i.e. symlink) on disk at the folder/cwd generated from getFolderPath.
 * After creating the symbolic link, it will be emitted from the stream so you can keep piping these around.
 * The file will be modified after being written to this stream:
 * cwd, base, and path will be overwritten to match the folder
 */
export function symlink(getFolderPath: (File: File) => string, opts?: SymlinkOptions): NodeJS.ReadWriteStream;

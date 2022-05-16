var $ki5hV$path = require("path");
var $ki5hV$fs = require("fs");
var $ki5hV$util = require("util");
var $ki5hV$parcelcore = require("@parcel/core");
var $ki5hV$parcelwatcher = require("@parcel/watcher");
var $ki5hV$parcelfssearch = require("@parcel/fs-search");
var $ki5hV$assert = require("assert");
var $ki5hV$constants = require("constants");
var $ki5hV$stream = require("stream");
var $ki5hV$crypto = require("crypto");
var $ki5hV$parcelutils = require("@parcel/utils");
var $ki5hV$parcelworkers = require("@parcel/workers");
var $ki5hV$events = require("events");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire0b48"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire0b48"] = parcelRequire;
}
parcelRequire.register("7g2As", function(module, exports) {
// Delegates to `succ` on sucecss or to `fail` on error
// ex: Thing.load(123, iferr(cb, thing => ...))
const iferr = (fail, succ)=>(err, ...a)=>err ? fail(err) : succ(...a)
;
// Like iferr, but also catches errors thrown from `succ` and passes to `fail`
const tiferr = (fail, succ)=>iferr(fail, (...a)=>{
        try {
            succ(...a);
        } catch (err) {
            fail(err);
        }
    })
;
// Delegate to the success function on success, throws the error otherwise
// ex: Thing.load(123, throwerr(thing => ...))
const throwerr = iferr.bind(null, (err)=>{
    throw err;
});
// Prints errors when one is passed, or does nothing otherwise
// ex: Thing.load(123, printerr)
const printerr = iferr((err)=>console.error(err)
, ()=>{
});
module.exports = exports = iferr;
exports.iferr = iferr;
exports.tiferr = tiferr;
exports.throwerr = throwerr;
exports.printerr = printerr;

});


$parcel$export(module.exports, "ncp", () => $e46c9778a96a2930$export$d3a8044e3fef7335);

var $10145ab9dc478fed$exports = {};

$parcel$export($10145ab9dc478fed$exports, "NodeFS", () => $10145ab9dc478fed$export$c4e0ef2ab73c21e7);
var $7250854f629b7e00$exports = {};

var $14ed6d859fc43bf5$exports = {};

var $14ed6d859fc43bf5$var$origCwd = process.cwd;
var $14ed6d859fc43bf5$var$cwd = null;
var $14ed6d859fc43bf5$var$platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
    if (!$14ed6d859fc43bf5$var$cwd) $14ed6d859fc43bf5$var$cwd = $14ed6d859fc43bf5$var$origCwd.call(process);
    return $14ed6d859fc43bf5$var$cwd;
};
try {
    process.cwd();
} catch (er) {
}
var $14ed6d859fc43bf5$var$chdir = process.chdir;
process.chdir = function(d) {
    $14ed6d859fc43bf5$var$cwd = null;
    $14ed6d859fc43bf5$var$chdir.call(process, d);
};
$14ed6d859fc43bf5$exports = $14ed6d859fc43bf5$var$patch;
function $14ed6d859fc43bf5$var$patch(fs1) {
    // (re-)implement some things that are known busted or missing.
    // lchmod, broken prior to 0.6.2
    // back-port the fix here.
    if ($ki5hV$constants.hasOwnProperty('O_SYMLINK') && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) patchLchmod(fs1);
    // lutimes implementation, or no-op
    if (!fs1.lutimes) patchLutimes(fs1);
    // https://github.com/isaacs/node-graceful-fs/issues/4
    // Chown should not fail on einval or eperm if non-root.
    // It should not fail on enosys ever, as this just indicates
    // that a fs doesn't support the intended operation.
    fs1.chown = chownFix(fs1.chown);
    fs1.fchown = chownFix(fs1.fchown);
    fs1.lchown = chownFix(fs1.lchown);
    fs1.chmod = chmodFix(fs1.chmod);
    fs1.fchmod = chmodFix(fs1.fchmod);
    fs1.lchmod = chmodFix(fs1.lchmod);
    fs1.chownSync = chownFixSync(fs1.chownSync);
    fs1.fchownSync = chownFixSync(fs1.fchownSync);
    fs1.lchownSync = chownFixSync(fs1.lchownSync);
    fs1.chmodSync = chmodFixSync(fs1.chmodSync);
    fs1.fchmodSync = chmodFixSync(fs1.fchmodSync);
    fs1.lchmodSync = chmodFixSync(fs1.lchmodSync);
    fs1.stat = statFix(fs1.stat);
    fs1.fstat = statFix(fs1.fstat);
    fs1.lstat = statFix(fs1.lstat);
    fs1.statSync = statFixSync(fs1.statSync);
    fs1.fstatSync = statFixSync(fs1.fstatSync);
    fs1.lstatSync = statFixSync(fs1.lstatSync);
    // if lchmod/lchown do not exist, then make them no-ops
    if (!fs1.lchmod) {
        fs1.lchmod = function(path, mode, cb) {
            if (cb) process.nextTick(cb);
        };
        fs1.lchmodSync = function() {
        };
    }
    if (!fs1.lchown) {
        fs1.lchown = function(path, uid, gid, cb) {
            if (cb) process.nextTick(cb);
        };
        fs1.lchownSync = function() {
        };
    }
    // on Windows, A/V software can lock the directory, causing this
    // to fail with an EACCES or EPERM if the directory contains newly
    // created files.  Try again on failure, for up to 60 seconds.
    // Set the timeout this long because some Windows Anti-Virus, such as Parity
    // bit9, may lock files for up to a minute, causing npm package install
    // failures. Also, take care to yield the scheduler. Windows scheduling gives
    // CPU to a busy looping process, which can cause the program causing the lock
    // contention to be starved of CPU by node, so the contention doesn't resolve.
    if ($14ed6d859fc43bf5$var$platform === "win32") fs1.rename = (function(fs$rename) {
        return function(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er1) {
                if (er1 && (er1.code === "EACCES" || er1.code === "EPERM") && Date.now() - start < 60000) {
                    setTimeout(function() {
                        fs1.stat(to, function(stater, st) {
                            if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);
                            else cb(er1);
                        });
                    }, backoff);
                    if (backoff < 100) backoff += 10;
                    return;
                }
                if (cb) cb(er1);
            });
        };
    })(fs1.rename);
    // if read() returns EAGAIN, then just try it again.
    fs1.read = (function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
            var callback;
            if (callback_ && typeof callback_ === 'function') {
                var eagCounter = 0;
                callback = function(er2, _, __) {
                    if (er2 && er2.code === 'EAGAIN' && eagCounter < 10) {
                        eagCounter++;
                        return fs$read.call(fs1, fd, buffer, offset, length, position, callback);
                    }
                    callback_.apply(this, arguments);
                };
            }
            return fs$read.call(fs1, fd, buffer, offset, length, position, callback);
        }
        // This ensures `util.promisify` works as it does for native `fs.read`.
        read.__proto__ = fs$read;
        return read;
    })(fs1.read);
    fs1.readSync = (function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
            var eagCounter = 0;
            while(true)try {
                return fs$readSync.call(fs1, fd, buffer, offset, length, position);
            } catch (er3) {
                if (er3.code === 'EAGAIN' && eagCounter < 10) {
                    eagCounter++;
                    continue;
                }
                throw er3;
            }
        };
    })(fs1.readSync);
    function patchLchmod(fs) {
        fs.lchmod = function(path, mode, callback) {
            fs.open(path, $ki5hV$constants.O_WRONLY | $ki5hV$constants.O_SYMLINK, mode, function(err1, fd) {
                if (err1) {
                    if (callback) callback(err1);
                    return;
                }
                // prefer to return the chmod error, if one occurs,
                // but still try to close, and report closing errors if they occur.
                fs.fchmod(fd, mode, function(err) {
                    fs.close(fd, function(err2) {
                        if (callback) callback(err || err2);
                    });
                });
            });
        };
        fs.lchmodSync = function(path, mode) {
            var fd = fs.openSync(path, $ki5hV$constants.O_WRONLY | $ki5hV$constants.O_SYMLINK, mode);
            // prefer to return the chmod error, if one occurs,
            // but still try to close, and report closing errors if they occur.
            var threw = true;
            var ret;
            try {
                ret = fs.fchmodSync(fd, mode);
                threw = false;
            } finally{
                if (threw) try {
                    fs.closeSync(fd);
                } catch (er) {
                }
                else fs.closeSync(fd);
            }
            return ret;
        };
    }
    function patchLutimes(fs) {
        if ($ki5hV$constants.hasOwnProperty("O_SYMLINK")) {
            fs.lutimes = function(path, at, mt, cb) {
                fs.open(path, $ki5hV$constants.O_SYMLINK, function(er4, fd) {
                    if (er4) {
                        if (cb) cb(er4);
                        return;
                    }
                    fs.futimes(fd, at, mt, function(er5) {
                        fs.close(fd, function(er2) {
                            if (cb) cb(er5 || er2);
                        });
                    });
                });
            };
            fs.lutimesSync = function(path, at, mt) {
                var fd = fs.openSync(path, $ki5hV$constants.O_SYMLINK);
                var ret;
                var threw = true;
                try {
                    ret = fs.futimesSync(fd, at, mt);
                    threw = false;
                } finally{
                    if (threw) try {
                        fs.closeSync(fd);
                    } catch (er) {
                    }
                    else fs.closeSync(fd);
                }
                return ret;
            };
        } else {
            fs.lutimes = function(_a, _b, _c, cb) {
                if (cb) process.nextTick(cb);
            };
            fs.lutimesSync = function() {
            };
        }
    }
    function chmodFix(orig) {
        if (!orig) return orig;
        return function(target, mode, cb) {
            return orig.call(fs1, target, mode, function(er6) {
                if (chownErOk(er6)) er6 = null;
                if (cb) cb.apply(this, arguments);
            });
        };
    }
    function chmodFixSync(orig) {
        if (!orig) return orig;
        return function(target, mode) {
            try {
                return orig.call(fs1, target, mode);
            } catch (er7) {
                if (!chownErOk(er7)) throw er7;
            }
        };
    }
    function chownFix(orig) {
        if (!orig) return orig;
        return function(target, uid, gid, cb) {
            return orig.call(fs1, target, uid, gid, function(er8) {
                if (chownErOk(er8)) er8 = null;
                if (cb) cb.apply(this, arguments);
            });
        };
    }
    function chownFixSync(orig) {
        if (!orig) return orig;
        return function(target, uid, gid) {
            try {
                return orig.call(fs1, target, uid, gid);
            } catch (er9) {
                if (!chownErOk(er9)) throw er9;
            }
        };
    }
    function statFix(orig) {
        if (!orig) return orig;
        // Older versions of Node erroneously returned signed integers for
        // uid + gid.
        return function(target, options, cb) {
            if (typeof options === 'function') {
                cb = options;
                options = null;
            }
            function callback(er, stats) {
                if (stats) {
                    if (stats.uid < 0) stats.uid += 4294967296;
                    if (stats.gid < 0) stats.gid += 4294967296;
                }
                if (cb) cb.apply(this, arguments);
            }
            return options ? orig.call(fs1, target, options, callback) : orig.call(fs1, target, callback);
        };
    }
    function statFixSync(orig) {
        if (!orig) return orig;
        // Older versions of Node erroneously returned signed integers for
        // uid + gid.
        return function(target, options) {
            var stats = options ? orig.call(fs1, target, options) : orig.call(fs1, target);
            if (stats.uid < 0) stats.uid += 4294967296;
            if (stats.gid < 0) stats.gid += 4294967296;
            return stats;
        };
    }
    // ENOSYS means that the fs doesn't support the op. Just ignore
    // that, because it doesn't matter.
    //
    // if there's no getuid, or if getuid() is something other
    // than 0, and the error is EINVAL or EPERM, then just ignore
    // it.
    //
    // This specific case is a silent failure in cp, install, tar,
    // and most other unix tools that manage permissions.
    //
    // When running as root, or if other types of errors are
    // encountered, then it's strict.
    function chownErOk(er10) {
        if (!er10) return true;
        if (er10.code === "ENOSYS") return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
            if (er10.code === "EINVAL" || er10.code === "EPERM") return true;
        }
        return false;
    }
}


var $ec8337b8453e4d66$exports = {};

var $ec8337b8453e4d66$require$Stream = $ki5hV$stream.Stream;
$ec8337b8453e4d66$exports = $ec8337b8453e4d66$var$legacy;
function $ec8337b8453e4d66$var$legacy(fs) {
    function ReadStream(path, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path, options);
        $ec8337b8453e4d66$require$Stream.call(this);
        var self = this;
        this.path = path;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = 'r';
        this.mode = 438; /*=0666*/ 
        this.bufferSize = 65536;
        options = options || {
        };
        // Mixin options into this
        var keys = Object.keys(options);
        for(var index = 0, length = keys.length; index < length; index++){
            var key = keys[index];
            this[key] = options[key];
        }
        if (this.encoding) this.setEncoding(this.encoding);
        if (this.start !== undefined) {
            if ('number' !== typeof this.start) {
                throw TypeError('start must be a Number');
            }
            if (this.end === undefined) {
                this.end = Infinity;
            } else if ('number' !== typeof this.end) {
                throw TypeError('end must be a Number');
            }
            if (this.start > this.end) {
                throw new Error('start must be <= end');
            }
            this.pos = this.start;
        }
        if (this.fd !== null) {
            process.nextTick(function() {
                self._read();
            });
            return;
        }
        fs.open(this.path, this.flags, this.mode, function(err, fd) {
            if (err) {
                self.emit('error', err);
                self.readable = false;
                return;
            }
            self.fd = fd;
            self.emit('open', fd);
            self._read();
        });
    }
    function WriteStream(path, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path, options);
        $ec8337b8453e4d66$require$Stream.call(this);
        this.path = path;
        this.fd = null;
        this.writable = true;
        this.flags = 'w';
        this.encoding = 'binary';
        this.mode = 438; /*=0666*/ 
        this.bytesWritten = 0;
        options = options || {
        };
        // Mixin options into this
        var keys = Object.keys(options);
        for(var index = 0, length = keys.length; index < length; index++){
            var key = keys[index];
            this[key] = options[key];
        }
        if (this.start !== undefined) {
            if ('number' !== typeof this.start) {
                throw TypeError('start must be a Number');
            }
            if (this.start < 0) {
                throw new Error('start must be >= zero');
            }
            this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
            this._open = fs.open;
            this._queue.push([
                this._open,
                this.path,
                this.flags,
                this.mode,
                undefined
            ]);
            this.flush();
        }
    }
    return {
        ReadStream: ReadStream,
        WriteStream: WriteStream
    };
}


var $142b189e92f6750b$exports = {};
'use strict';
$142b189e92f6750b$exports = $142b189e92f6750b$var$clone;
function $142b189e92f6750b$var$clone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Object) var copy = {
        __proto__: obj.__proto__
    };
    else var copy = Object.create(null);
    Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
    });
    return copy;
}



/* istanbul ignore next - node 0.x polyfill */ var $7250854f629b7e00$var$gracefulQueue;
var $7250854f629b7e00$var$previousSymbol;
/* istanbul ignore else - node 0.x polyfill */ if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
    $7250854f629b7e00$var$gracefulQueue = Symbol.for('graceful-fs.queue');
    // This is used in testing by future versions
    $7250854f629b7e00$var$previousSymbol = Symbol.for('graceful-fs.previous');
} else {
    $7250854f629b7e00$var$gracefulQueue = '___graceful-fs.queue';
    $7250854f629b7e00$var$previousSymbol = '___graceful-fs.previous';
}
function $7250854f629b7e00$var$noop() {
}
function $7250854f629b7e00$var$publishQueue(context, queue) {
    Object.defineProperty(context, $7250854f629b7e00$var$gracefulQueue, {
        get: function() {
            return queue;
        }
    });
}
var $7250854f629b7e00$var$debug = $7250854f629b7e00$var$noop;
if ($ki5hV$util.debuglog) $7250854f629b7e00$var$debug = $ki5hV$util.debuglog('gfs4');
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) $7250854f629b7e00$var$debug = function() {
    var m = $ki5hV$util.format.apply($ki5hV$util, arguments);
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
    console.error(m);
};

// Once time initialization
if (!$ki5hV$fs[$7250854f629b7e00$var$gracefulQueue]) {
    // This queue can be shared by multiple loaded instances
    var $7250854f629b7e00$var$queue = $parcel$global[$7250854f629b7e00$var$gracefulQueue] || [];
    $7250854f629b7e00$var$publishQueue($ki5hV$fs, $7250854f629b7e00$var$queue);
    // Patch fs.close/closeSync to shared queue version, because we need
    // to retry() whenever a close happens *anywhere* in the program.
    // This is essential when multiple graceful-fs instances are
    // in play at the same time.
    $ki5hV$fs.close = (function(fs$close) {
        function close(fd, cb) {
            return fs$close.call($ki5hV$fs, fd, function(err) {
                // This function uses the graceful-fs shared queue
                if (!err) $7250854f629b7e00$var$retry();
                if (typeof cb === 'function') cb.apply(this, arguments);
            });
        }
        Object.defineProperty(close, $7250854f629b7e00$var$previousSymbol, {
            value: fs$close
        });
        return close;
    })($ki5hV$fs.close);
    $ki5hV$fs.closeSync = (function(fs$closeSync) {
        function closeSync(fd) {
            // This function uses the graceful-fs shared queue
            fs$closeSync.apply($ki5hV$fs, arguments);
            $7250854f629b7e00$var$retry();
        }
        Object.defineProperty(closeSync, $7250854f629b7e00$var$previousSymbol, {
            value: fs$closeSync
        });
        return closeSync;
    })($ki5hV$fs.closeSync);
    if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) process.on('exit', function() {
        $7250854f629b7e00$var$debug($ki5hV$fs[$7250854f629b7e00$var$gracefulQueue]);
        $ki5hV$assert.equal($ki5hV$fs[$7250854f629b7e00$var$gracefulQueue].length, 0);
    });
}
if (!$parcel$global[$7250854f629b7e00$var$gracefulQueue]) $7250854f629b7e00$var$publishQueue($parcel$global, $ki5hV$fs[$7250854f629b7e00$var$gracefulQueue]);
$7250854f629b7e00$exports = $7250854f629b7e00$var$patch($142b189e92f6750b$exports($ki5hV$fs));
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !$ki5hV$fs.__patched) {
    $7250854f629b7e00$exports = $7250854f629b7e00$var$patch($ki5hV$fs);
    $ki5hV$fs.__patched = true;
}
function $7250854f629b7e00$var$patch(fs) {
    // Everything that references the open() function needs to be in here
    $14ed6d859fc43bf5$exports(fs);
    fs.gracefulify = $7250854f629b7e00$var$patch;
    fs.createReadStream = createReadStream;
    fs.createWriteStream = createWriteStream;
    var fs$readFile = fs.readFile;
    fs.readFile = readFile;
    function readFile(path1, options1, cb1) {
        if (typeof options1 === 'function') cb1 = options1, options1 = null;
        function go$readFile(path, options, cb) {
            return fs$readFile(path, options, function(err) {
                if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) $7250854f629b7e00$var$enqueue([
                    go$readFile,
                    [
                        path,
                        options,
                        cb
                    ]
                ]);
                else {
                    if (typeof cb === 'function') cb.apply(this, arguments);
                    $7250854f629b7e00$var$retry();
                }
            });
        }
        return go$readFile(path1, options1, cb1);
    }
    var fs$writeFile = fs.writeFile;
    fs.writeFile = writeFile;
    function writeFile(path2, data1, options2, cb2) {
        if (typeof options2 === 'function') cb2 = options2, options2 = null;
        function go$writeFile(path, data, options, cb) {
            return fs$writeFile(path, data, options, function(err) {
                if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) $7250854f629b7e00$var$enqueue([
                    go$writeFile,
                    [
                        path,
                        data,
                        options,
                        cb
                    ]
                ]);
                else {
                    if (typeof cb === 'function') cb.apply(this, arguments);
                    $7250854f629b7e00$var$retry();
                }
            });
        }
        return go$writeFile(path2, data1, options2, cb2);
    }
    var fs$appendFile = fs.appendFile;
    if (fs$appendFile) fs.appendFile = appendFile;
    function appendFile(path3, data2, options3, cb3) {
        if (typeof options3 === 'function') cb3 = options3, options3 = null;
        function go$appendFile(path, data, options, cb) {
            return fs$appendFile(path, data, options, function(err) {
                if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) $7250854f629b7e00$var$enqueue([
                    go$appendFile,
                    [
                        path,
                        data,
                        options,
                        cb
                    ]
                ]);
                else {
                    if (typeof cb === 'function') cb.apply(this, arguments);
                    $7250854f629b7e00$var$retry();
                }
            });
        }
        return go$appendFile(path3, data2, options3, cb3);
    }
    var fs$readdir = fs.readdir;
    fs.readdir = readdir;
    function readdir(path, options, cb) {
        var args = [
            path
        ];
        if (typeof options !== 'function') args.push(options);
        else cb = options;
        args.push(go$readdir$cb);
        function go$readdir$cb(err, files) {
            if (files && files.sort) files.sort();
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) $7250854f629b7e00$var$enqueue([
                go$readdir,
                [
                    args
                ]
            ]);
            else {
                if (typeof cb === 'function') cb.apply(this, arguments);
                $7250854f629b7e00$var$retry();
            }
        }
        return go$readdir(args);
    }
    function go$readdir(args) {
        return fs$readdir.apply(fs, args);
    }
    if (process.version.substr(0, 4) === 'v0.8') {
        var legStreams = $ec8337b8453e4d66$exports(fs);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
    }
    var fs$ReadStream = fs.ReadStream;
    if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
    }
    var fs$WriteStream = fs.WriteStream;
    if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
    }
    Object.defineProperty(fs, 'ReadStream', {
        get: function() {
            return ReadStream;
        },
        set: function(val) {
            ReadStream = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(fs, 'WriteStream', {
        get: function() {
            return WriteStream;
        },
        set: function(val) {
            WriteStream = val;
        },
        enumerable: true,
        configurable: true
    });
    // legacy names
    var FileReadStream = ReadStream;
    Object.defineProperty(fs, 'FileReadStream', {
        get: function() {
            return FileReadStream;
        },
        set: function(val) {
            FileReadStream = val;
        },
        enumerable: true,
        configurable: true
    });
    var FileWriteStream = WriteStream;
    Object.defineProperty(fs, 'FileWriteStream', {
        get: function() {
            return FileWriteStream;
        },
        set: function(val) {
            FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
    });
    function ReadStream(path, options) {
        if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;
        else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }
    function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
            if (err) {
                if (that.autoClose) that.destroy();
                that.emit('error', err);
            } else {
                that.fd = fd;
                that.emit('open', fd);
                that.read();
            }
        });
    }
    function WriteStream(path, options) {
        if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;
        else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
    }
    function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
            if (err) {
                that.destroy();
                that.emit('error', err);
            } else {
                that.fd = fd;
                that.emit('open', fd);
            }
        });
    }
    function createReadStream(path, options) {
        return new fs.ReadStream(path, options);
    }
    function createWriteStream(path, options) {
        return new fs.WriteStream(path, options);
    }
    var fs$open = fs.open;
    fs.open = open;
    function open(path4, flags1, mode1, cb4) {
        if (typeof mode1 === 'function') cb4 = mode1, mode1 = null;
        function go$open(path, flags, mode, cb) {
            return fs$open(path, flags, mode, function(err, fd) {
                if (err && (err.code === 'EMFILE' || err.code === 'ENFILE')) $7250854f629b7e00$var$enqueue([
                    go$open,
                    [
                        path,
                        flags,
                        mode,
                        cb
                    ]
                ]);
                else {
                    if (typeof cb === 'function') cb.apply(this, arguments);
                    $7250854f629b7e00$var$retry();
                }
            });
        }
        return go$open(path4, flags1, mode1, cb4);
    }
    return fs;
}
function $7250854f629b7e00$var$enqueue(elem) {
    $7250854f629b7e00$var$debug('ENQUEUE', elem[0].name, elem[1]);
    $ki5hV$fs[$7250854f629b7e00$var$gracefulQueue].push(elem);
}
function $7250854f629b7e00$var$retry() {
    var elem = $ki5hV$fs[$7250854f629b7e00$var$gracefulQueue].shift();
    if (elem) {
        $7250854f629b7e00$var$debug('RETRY', elem[0].name, elem[1]);
        elem[0].apply(null, elem[1]);
    }
}



var $48fc3d56c5dfadb2$exports = {};


$48fc3d56c5dfadb2$exports = $48fc3d56c5dfadb2$var$ncp;
$48fc3d56c5dfadb2$var$ncp.ncp = $48fc3d56c5dfadb2$var$ncp;
function $48fc3d56c5dfadb2$var$ncp(source1, dest, options, callback) {
    var cback = callback;
    if (!callback) {
        cback = options;
        options = {
        };
    }
    var basePath = process.cwd(), currentPath = $ki5hV$path.resolve(basePath, source1), targetPath = $ki5hV$path.resolve(basePath, dest), filter = options.filter, rename = options.rename, transform = options.transform, clobber = options.clobber !== false, modified = options.modified, dereference = options.dereference, errs = null, started = 0, finished = 0, running = 0, limit = options.limit || $48fc3d56c5dfadb2$var$ncp.limit || 16;
    limit = limit < 1 ? 1 : limit > 512 ? 512 : limit;
    startCopy(currentPath);
    function startCopy(source) {
        started++;
        if (filter) {
            if (filter instanceof RegExp) {
                if (!filter.test(source)) return cb(true);
            } else if (typeof filter === 'function') {
                if (!filter(source)) return cb(true);
            }
        }
        return getStats(source);
    }
    function getStats(source) {
        var stat = dereference ? $ki5hV$fs.stat : $ki5hV$fs.lstat;
        if (running >= limit) return setImmediate(function() {
            getStats(source);
        });
        running++;
        stat(source, function(err, stats) {
            var item = {
            };
            if (err) return onError(err);
            // We need to get the mode from the stats object and preserve it.
            item.name = source;
            item.mode = stats.mode;
            item.mtime = stats.mtime; //modified time
            item.atime = stats.atime; //access time
            if (stats.isDirectory()) return onDir(item);
            else if (stats.isFile()) return onFile(item);
            else if (stats.isSymbolicLink()) // Symlinks don't really need to know about the mode.
            return onLink(source);
        });
    }
    function onFile(file) {
        var target = file.name.replace(currentPath, targetPath);
        if (rename) target = rename(target);
        isWritable(target, function(writable) {
            if (writable) return copyFile(file, target);
            if (clobber) rmFile(target, function() {
                copyFile(file, target);
            });
            if (modified) {
                var stat = dereference ? $ki5hV$fs.stat : $ki5hV$fs.lstat;
                stat(target, function(err, stats) {
                    //if souce modified time greater to target modified time copy file
                    if (file.mtime.getTime() > stats.mtime.getTime()) copyFile(file, target);
                    else return cb();
                });
            } else return cb();
        });
    }
    function copyFile(file, target) {
        var readStream = $ki5hV$fs.createReadStream(file.name), writeStream = $ki5hV$fs.createWriteStream(target, {
            mode: file.mode
        });
        readStream.on('error', onError);
        writeStream.on('error', onError);
        if (transform) transform(readStream, writeStream, file);
        else writeStream.on('open', function() {
            readStream.pipe(writeStream);
        });
        writeStream.once('finish', function() {
            if (modified) {
                //target file modified date sync.
                $ki5hV$fs.utimesSync(target, file.atime, file.mtime);
                cb();
            } else cb();
        });
    }
    function rmFile(file, done) {
        $ki5hV$fs.unlink(file, function(err) {
            if (err) return onError(err);
            return done();
        });
    }
    function onDir(dir) {
        var target = dir.name.replace(currentPath, targetPath);
        isWritable(target, function(writable) {
            if (writable) return mkDir(dir, target);
            copyDir(dir.name);
        });
    }
    function mkDir(dir, target) {
        $ki5hV$fs.mkdir(target, dir.mode, function(err) {
            if (err) return onError(err);
            copyDir(dir.name);
        });
    }
    function copyDir(dir) {
        $ki5hV$fs.readdir(dir, function(err, items) {
            if (err) return onError(err);
            items.forEach(function(item) {
                startCopy($ki5hV$path.join(dir, item));
            });
            return cb();
        });
    }
    function onLink(link) {
        var target = link.replace(currentPath, targetPath);
        $ki5hV$fs.readlink(link, function(err, resolvedPath) {
            if (err) return onError(err);
            checkLink(resolvedPath, target);
        });
    }
    function checkLink(resolvedPath, target) {
        if (dereference) resolvedPath = $ki5hV$path.resolve(basePath, resolvedPath);
        isWritable(target, function(writable) {
            if (writable) return makeLink(resolvedPath, target);
            $ki5hV$fs.readlink(target, function(err, targetDest) {
                if (err) return onError(err);
                if (dereference) targetDest = $ki5hV$path.resolve(basePath, targetDest);
                if (targetDest === resolvedPath) return cb();
                return rmFile(target, function() {
                    makeLink(resolvedPath, target);
                });
            });
        });
    }
    function makeLink(linkPath, target) {
        $ki5hV$fs.symlink(linkPath, target, function(err) {
            if (err) return onError(err);
            return cb();
        });
    }
    function isWritable(path, done) {
        $ki5hV$fs.lstat(path, function(err) {
            if (err) {
                if (err.code === 'ENOENT') return done(true);
                return done(false);
            }
            return done(false);
        });
    }
    function onError(err) {
        if (options.stopOnError) return cback(err);
        else if (!errs && options.errs) errs = $ki5hV$fs.createWriteStream(options.errs);
        else if (!errs) errs = [];
        if (typeof errs.write === 'undefined') errs.push(err);
        else errs.write(err.stack + '\n\n');
        return cb();
    }
    function cb(skipped) {
        if (!skipped) running--;
        finished++;
        if (started === finished && running === 0) {
            if (cback !== undefined) return errs ? cback(errs) : cback(null);
        }
    }
}




var $d31bbd70a8909e11$exports = {};


var $d31bbd70a8909e11$require$Writable = $ki5hV$stream.Writable;

var $e4c74bbd7de08fe5$exports = {};
(function() {
    var cache;
    // Call this function without `new` to use the cached object (good for
    // single-threaded environments), or with `new` to create a new object.
    //
    // @param {string} key A UTF-16 or ASCII string
    // @param {number} seed An optional positive integer
    // @return {object} A MurmurHash3 object for incremental hashing
    function MurmurHash3(key, seed) {
        var m = this instanceof MurmurHash3 ? this : cache;
        m.reset(seed);
        if (typeof key === 'string' && key.length > 0) m.hash(key);
        if (m !== this) return m;
    }
    // Incrementally add a string to this hash
    //
    // @param {string} key A UTF-16 or ASCII string
    // @return {object} this
    MurmurHash3.prototype.hash = function(key) {
        var h1, k1, i, top, len;
        len = key.length;
        this.len += len;
        k1 = this.k1;
        i = 0;
        switch(this.rem){
            case 0:
                k1 ^= len > i ? key.charCodeAt(i++) & 65535 : 0;
            case 1:
                k1 ^= len > i ? (key.charCodeAt(i++) & 65535) << 8 : 0;
            case 2:
                k1 ^= len > i ? (key.charCodeAt(i++) & 65535) << 16 : 0;
            case 3:
                k1 ^= len > i ? (key.charCodeAt(i) & 255) << 24 : 0;
                k1 ^= len > i ? (key.charCodeAt(i++) & 65280) >> 8 : 0;
        }
        this.rem = len + this.rem & 3; // & 3 is same as % 4
        len -= this.rem;
        if (len > 0) {
            h1 = this.h1;
            while(true){
                k1 = k1 * 11601 + (k1 & 65535) * 3432906752 & 4294967295;
                k1 = k1 << 15 | k1 >>> 17;
                k1 = k1 * 13715 + (k1 & 65535) * 461832192 & 4294967295;
                h1 ^= k1;
                h1 = h1 << 13 | h1 >>> 19;
                h1 = h1 * 5 + 3864292196 & 4294967295;
                if (i >= len) break;
                k1 = key.charCodeAt(i++) & 65535 ^ (key.charCodeAt(i++) & 65535) << 8 ^ (key.charCodeAt(i++) & 65535) << 16;
                top = key.charCodeAt(i++);
                k1 ^= (top & 255) << 24 ^ (top & 65280) >> 8;
            }
            k1 = 0;
            switch(this.rem){
                case 3:
                    k1 ^= (key.charCodeAt(i + 2) & 65535) << 16;
                case 2:
                    k1 ^= (key.charCodeAt(i + 1) & 65535) << 8;
                case 1:
                    k1 ^= key.charCodeAt(i) & 65535;
            }
            this.h1 = h1;
        }
        this.k1 = k1;
        return this;
    };
    // Get the result of this hash
    //
    // @return {number} The 32-bit hash
    MurmurHash3.prototype.result = function() {
        var k1, h1;
        k1 = this.k1;
        h1 = this.h1;
        if (k1 > 0) {
            k1 = k1 * 11601 + (k1 & 65535) * 3432906752 & 4294967295;
            k1 = k1 << 15 | k1 >>> 17;
            k1 = k1 * 13715 + (k1 & 65535) * 461832192 & 4294967295;
            h1 ^= k1;
        }
        h1 ^= this.len;
        h1 ^= h1 >>> 16;
        h1 = h1 * 51819 + (h1 & 65535) * 2246770688 & 4294967295;
        h1 ^= h1 >>> 13;
        h1 = h1 * 44597 + (h1 & 65535) * 3266445312 & 4294967295;
        h1 ^= h1 >>> 16;
        return h1 >>> 0;
    };
    // Reset the hash object for reuse
    //
    // @param {number} seed An optional positive integer
    MurmurHash3.prototype.reset = function(seed) {
        this.h1 = typeof seed === 'number' ? seed : 0;
        this.rem = this.k1 = this.len = 0;
        return this;
    };
    // A cached object to use. This can be safely used if you're in a single-
    // threaded environment, otherwise you need to create new hashes to use.
    cache = new MurmurHash3();
    if ("object" != 'undefined') $e4c74bbd7de08fe5$exports = MurmurHash3;
    else this.MurmurHash3 = MurmurHash3;
})();



var $7g2As = parcelRequire("7g2As");

var $d454ae460e51b7b1$exports = {};
'use strict';
var $d454ae460e51b7b1$var$threadId;

try {
    var $d454ae460e51b7b1$var$Worker = $d454ae460e51b7b1$import$99ffd1ece40e237f;
    if ($d454ae460e51b7b1$var$Worker.isMainThread) $d454ae460e51b7b1$var$threadId = -1;
    else $d454ae460e51b7b1$var$threadId = $d454ae460e51b7b1$var$Worker.threadId;
} catch (e) {
    // no worker support
    $d454ae460e51b7b1$var$threadId = -1;
}
$d454ae460e51b7b1$exports = $d454ae460e51b7b1$var$threadId;


function $d31bbd70a8909e11$var$murmurhex() {
    var hash = $e4c74bbd7de08fe5$exports('');
    for(var ii = 0; ii < arguments.length; ++ii)hash.hash('' + arguments[ii]);
    return hash.result();
}
var $d31bbd70a8909e11$var$invocations = 0;
function $d31bbd70a8909e11$var$getTmpname(filename) {
    return filename + '.' + $d31bbd70a8909e11$var$murmurhex(__filename, process.pid, $d454ae460e51b7b1$exports, ++$d31bbd70a8909e11$var$invocations);
}
var $d31bbd70a8909e11$var$setImmediate = $parcel$global.setImmediate || setTimeout;
$d31bbd70a8909e11$exports = $d31bbd70a8909e11$var$WriteStreamAtomic; // Requirements:
//   1. Write everything written to the stream to a temp file.
//   2. If there are no errors:
//      a. moves the temp file into its final destination
//      b. emits `finish` & `closed` ONLY after the file is
//         fully flushed and renamed.
//   3. If there's an error, removes the temp file.
$ki5hV$util.inherits($d31bbd70a8909e11$var$WriteStreamAtomic, $d31bbd70a8909e11$require$Writable);
function $d31bbd70a8909e11$var$WriteStreamAtomic(path, options) {
    if (!(this instanceof $d31bbd70a8909e11$var$WriteStreamAtomic)) return new $d31bbd70a8909e11$var$WriteStreamAtomic(path, options);
    $d31bbd70a8909e11$require$Writable.call(this, options);
    this.__isWin = options && options.hasOwnProperty('isWin') ? options.isWin : process.platform === 'win32';
    this.__atomicTarget = path;
    this.__atomicTmp = $d31bbd70a8909e11$var$getTmpname(path);
    this.__atomicChown = options && options.chown;
    this.__atomicClosed = false;
    this.__atomicStream = $7250854f629b7e00$exports.WriteStream(this.__atomicTmp, options);
    this.__atomicStream.once('open', $d31bbd70a8909e11$var$handleOpen(this));
    this.__atomicStream.once('close', $d31bbd70a8909e11$var$handleClose(this));
    this.__atomicStream.once('error', $d31bbd70a8909e11$var$handleError(this));
} // We have to suppress default finish emitting, because ordinarily it
// would happen as soon as `end` is called on us and all of the
// data has been written to our target stream. So we suppress
// finish from being emitted here, and only emit it after our
// target stream is closed and we've moved everything around.
$d31bbd70a8909e11$var$WriteStreamAtomic.prototype.emit = function(event) {
    if (event === 'finish') return this.__atomicStream.end();
    return $d31bbd70a8909e11$require$Writable.prototype.emit.apply(this, arguments);
};
$d31bbd70a8909e11$var$WriteStreamAtomic.prototype._write = function(buffer, encoding, cb) {
    var flushed = this.__atomicStream.write(buffer, encoding);
    if (flushed) return cb();
    this.__atomicStream.once('drain', cb);
};
function $d31bbd70a8909e11$var$handleOpen(writeStream) {
    return function(fd) {
        writeStream.emit('open', fd);
    };
}
function $d31bbd70a8909e11$var$handleClose(writeStream) {
    function moveIntoPlace() {
        $7250854f629b7e00$exports.rename(writeStream.__atomicTmp, writeStream.__atomicTarget, $7g2As(trapWindowsEPERM, end));
    }
    function trapWindowsEPERM(err) {
        if (writeStream.__isWin && err.syscall && err.syscall === 'rename' && err.code && err.code === 'EPERM') {
            checkFileHashes(err);
        } else {
            cleanup(err);
        }
    }
    function checkFileHashes(eperm) {
        var inprocess = 2;
        var tmpFileHash = $ki5hV$crypto.createHash('sha512');
        var targetFileHash = $ki5hV$crypto.createHash('sha512');
        $7250854f629b7e00$exports.createReadStream(writeStream.__atomicTmp).on('data', function(data, enc) {
            tmpFileHash.update(data, enc);
        }).on('error', fileHashError).on('end', fileHashComplete);
        $7250854f629b7e00$exports.createReadStream(writeStream.__atomicTarget).on('data', function(data, enc) {
            targetFileHash.update(data, enc);
        }).on('error', fileHashError).on('end', fileHashComplete);
        function fileHashError() {
            if (inprocess === 0) return;
            inprocess = 0;
            cleanup(eperm);
        }
        function fileHashComplete() {
            if (inprocess === 0) return;
            if (--inprocess) return;
            if (tmpFileHash.digest('hex') === targetFileHash.digest('hex')) {
                return cleanup();
            } else {
                return cleanup(eperm);
            }
        }
    }
    function cleanup(err) {
        $7250854f629b7e00$exports.unlink(writeStream.__atomicTmp, function() {
            if (err) {
                writeStream.emit('error', err);
                writeStream.emit('close');
            } else {
                end();
            }
        });
    }
    function end() {
        // We have to use our parent class directly because we suppress `finish`
        // events fired via our own emit method.
        $d31bbd70a8909e11$require$Writable.prototype.emit.call(writeStream, 'finish'); // Delay the close to provide the same temporal separation a physical
        // file operation would have– that is, the close event is emitted only
        // after the async close operation completes.
        $d31bbd70a8909e11$var$setImmediate(function() {
            writeStream.emit('close');
        });
    }
    return function() {
        if (writeStream.__atomicClosed) return;
        writeStream.__atomicClosed = true;
        if (writeStream.__atomicChown) {
            var uid = writeStream.__atomicChown.uid;
            var gid = writeStream.__atomicChown.gid;
            return $7250854f629b7e00$exports.chown(writeStream.__atomicTmp, uid, gid, $7g2As(cleanup, moveIntoPlace));
        } else moveIntoPlace();
    };
}
function $d31bbd70a8909e11$var$handleError(writeStream) {
    function cleanupSync() {
        try {
            $7250854f629b7e00$exports.unlinkSync(writeStream.__atomicTmp);
        } finally{
        }
    }
    return function(er) {
        cleanupSync();
        writeStream.emit('error', er);
        writeStream.__atomicClosed = true;
        writeStream.emit('close');
    };
}



var $46772b835b3d1aed$exports = {};
$46772b835b3d1aed$exports = JSON.parse("{\"name\":\"@parcel/fs\",\"version\":\"2.3.1\",\"description\":\"Blazing fast, zero configuration web application bundler\",\"license\":\"MIT\",\"publishConfig\":{\"access\":\"public\"},\"funding\":{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/parcel\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/parcel-bundler/parcel.git\"},\"main\":\"lib/index.js\",\"source\":\"src/index.js\",\"types\":\"index.d.ts\",\"engines\":{\"node\":\">= 12.0.0\"},\"targets\":{\"types\":false,\"main\":{\"includeNodeModules\":{\"@parcel/core\":false,\"@parcel/fs-search\":false,\"@parcel/types\":false,\"@parcel/utils\":false,\"@parcel/watcher\":false,\"@parcel/workers\":false}},\"browser\":{\"includeNodeModules\":{\"@parcel/core\":false,\"@parcel/fs-search\":false,\"@parcel/types\":false,\"@parcel/utils\":false,\"@parcel/watcher\":false,\"@parcel/workers\":false}}},\"scripts\":{\"build-ts\":\"mkdir -p lib && flow-to-ts src/types.js > lib/types.d.ts\",\"check-ts\":\"tsc --noEmit index.d.ts\"},\"dependencies\":{\"@parcel/fs-search\":\"2.3.1\",\"@parcel/types\":\"2.3.1\",\"@parcel/utils\":\"2.3.1\",\"@parcel/watcher\":\"^2.0.0\",\"@parcel/workers\":\"2.3.1\"},\"devDependencies\":{\"@parcel/fs-write-stream-atomic\":\"2.3.1\",\"graceful-fs\":\"^4.2.4\",\"ncp\":\"^2.0.0\",\"nullthrows\":\"^1.1.1\",\"utility-types\":\"^3.10.0\"},\"peerDependencies\":{\"@parcel/core\":\"^2.3.1\"},\"browser\":{\"@parcel/fs\":\"./lib/browser.js\",\"./src/NodeFS.js\":\"./src/NodeFS.browser.js\"},\"gitHead\":\"699f0b24c38eabcdad0960c62c03bd2f2902b19e\"}");




function $792f6c711e82470e$export$4c6d088a7d7f9947(fs, moduleName, dir) {
    let { root: root  } = ($parcel$interopDefault($ki5hV$path)).parse(dir);
    while(dir !== root){
        // Skip node_modules directories
        if (($parcel$interopDefault($ki5hV$path)).basename(dir) === 'node_modules') dir = ($parcel$interopDefault($ki5hV$path)).dirname(dir);
        try {
            let moduleDir = ($parcel$interopDefault($ki5hV$path)).join(dir, 'node_modules', moduleName);
            let stats = fs.statSync(moduleDir);
            if (stats.isDirectory()) return moduleDir;
        } catch (err) {
        } // Move up a directory
        dir = ($parcel$interopDefault($ki5hV$path)).dirname(dir);
    }
    return null;
}
function $792f6c711e82470e$export$d51a93c758976388(fs, fileNames, dir, root) {
    let { root: pathRoot  } = ($parcel$interopDefault($ki5hV$path)).parse(dir); // eslint-disable-next-line no-constant-condition
    while(true){
        if (($parcel$interopDefault($ki5hV$path)).basename(dir) === 'node_modules') return null;
        for (const fileName of fileNames){
            let filePath = ($parcel$interopDefault($ki5hV$path)).join(dir, fileName);
            try {
                if (fs.statSync(filePath).isFile()) return filePath;
            } catch (err) {
            }
        }
        if (dir === root || dir === pathRoot) break;
        dir = ($parcel$interopDefault($ki5hV$path)).dirname(dir);
    }
    return null;
}
function $792f6c711e82470e$export$64df6e3182fd5b2d(fs, filePaths) {
    for (let filePath of filePaths)try {
        if (fs.statSync(filePath).isFile()) return filePath;
    } catch (err) {
    }
}


// require('fs').promises
const $10145ab9dc478fed$var$realpath = $ki5hV$util.promisify(process.platform === 'win32' ? (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).realpath : (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).realpath.native);
const $10145ab9dc478fed$var$isPnP = process.versions.pnp != null;
class $10145ab9dc478fed$export$c4e0ef2ab73c21e7 {
    readFile = $ki5hV$util.promisify((/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).readFile);
    copyFile = $ki5hV$util.promisify((/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).copyFile);
    stat = $ki5hV$util.promisify((/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).stat);
    readdir = $ki5hV$util.promisify((/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).readdir);
    unlink = $ki5hV$util.promisify((/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).unlink);
    utimes = $ki5hV$util.promisify((/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).utimes);
    ncp = $ki5hV$util.promisify((/*@__PURE__*/$parcel$interopDefault($48fc3d56c5dfadb2$exports)));
    createReadStream = (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).createReadStream;
    cwd = ()=>process.cwd()
    ;
    chdir = (directory)=>process.chdir(directory)
    ;
    statSync = (path)=>(/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).statSync(path)
    ;
    realpathSync = process.platform === 'win32' ? (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).realpathSync : (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).realpathSync.native;
    existsSync = (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).existsSync;
    readdirSync = (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).readdirSync;
    findAncestorFile = $10145ab9dc478fed$var$isPnP ? (...args)=>$792f6c711e82470e$export$d51a93c758976388(this, ...args)
     : $ki5hV$parcelfssearch.findAncestorFile;
    findNodeModule = $10145ab9dc478fed$var$isPnP ? (...args)=>$792f6c711e82470e$export$4c6d088a7d7f9947(this, ...args)
     : $ki5hV$parcelfssearch.findNodeModule;
    findFirstFile = $10145ab9dc478fed$var$isPnP ? (...args)=>$792f6c711e82470e$export$64df6e3182fd5b2d(this, ...args)
     : $ki5hV$parcelfssearch.findFirstFile;
    createWriteStream(filePath, options) {
        return (/*@__PURE__*/$parcel$interopDefault($d31bbd70a8909e11$exports))(filePath, options);
    }
    async writeFile(filePath, contents, options) {
        let tmpFilePath = $10145ab9dc478fed$var$getTempFilePath(filePath);
        await (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).promises.writeFile(tmpFilePath, contents, options);
        await (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).promises.rename(tmpFilePath, filePath);
    }
    readFileSync(filePath, encoding) {
        if (encoding != null) return (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).readFileSync(filePath, encoding);
        return (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).readFileSync(filePath);
    }
    async realpath(originalPath) {
        try {
            return await $10145ab9dc478fed$var$realpath(originalPath, 'utf8');
        } catch (e) {
        }
        return originalPath;
    }
    exists(filePath) {
        return new Promise((resolve)=>{
            (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).exists(filePath, resolve);
        });
    }
    watch(dir, fn, opts) {
        return ($parcel$interopDefault($ki5hV$parcelwatcher)).subscribe(dir, fn, opts);
    }
    getEventsSince(dir, snapshot, opts) {
        return ($parcel$interopDefault($ki5hV$parcelwatcher)).getEventsSince(dir, snapshot, opts);
    }
    async writeSnapshot(dir, snapshot, opts) {
        await ($parcel$interopDefault($ki5hV$parcelwatcher)).writeSnapshot(dir, snapshot, opts);
    }
    static deserialize() {
        return new $10145ab9dc478fed$export$c4e0ef2ab73c21e7();
    }
    serialize() {
        return null;
    }
    async mkdirp(filePath) {
        await ($parcel$interopDefault($ki5hV$fs)).promises.mkdir(filePath, {
            recursive: true
        });
    }
    async rimraf(filePath) {
        if ((/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).promises.rm) {
            await (/*@__PURE__*/$parcel$interopDefault($7250854f629b7e00$exports)).promises.rm(filePath, {
                recursive: true,
                force: true
            });
            return;
        } // fs.promises.rm is not supported in node 12...
        let stat;
        try {
            stat = await this.stat(filePath);
        } catch (err) {
            return;
        }
        if (stat.isDirectory()) // $FlowFixMe
        await ($parcel$interopDefault($ki5hV$fs)).promises.rmdir(filePath, {
            recursive: true
        });
        else await ($parcel$interopDefault($ki5hV$fs)).promises.unlink(filePath);
    }
}
$ki5hV$parcelcore.registerSerializableClass(`${(/*@__PURE__*/$parcel$interopDefault($46772b835b3d1aed$exports)).version}:NodeFS`, $10145ab9dc478fed$export$c4e0ef2ab73c21e7);
let $10145ab9dc478fed$var$writeStreamCalls = 0;
let $10145ab9dc478fed$var$threadId;

try {
    ({ threadId: $10145ab9dc478fed$var$threadId  } = $10145ab9dc478fed$import$99ffd1ece40e237f);
} catch  {
} // Generate a temporary file path used for atomic writing of files.
function $10145ab9dc478fed$var$getTempFilePath(filePath) {
    $10145ab9dc478fed$var$writeStreamCalls = $10145ab9dc478fed$var$writeStreamCalls % Number.MAX_SAFE_INTEGER;
    return filePath + '.' + process.pid + ($10145ab9dc478fed$var$threadId != null ? '.' + $10145ab9dc478fed$var$threadId : '') + '.' + ($10145ab9dc478fed$var$writeStreamCalls++).toString(36);
}


var $86a3ba4eb3a17970$exports = {};

$parcel$export($86a3ba4eb3a17970$exports, "MemoryFS", () => $86a3ba4eb3a17970$export$3048eb7ec07c2c4e);






var $2342a1a76ff50050$exports = {};
'use strict';
function $2342a1a76ff50050$var$nullthrows(x, message) {
    if (x != null) return x;
    var error = new Error(message !== undefined ? message : 'Got unexpected ' + x);
    error.framesToPop = 1; // Skip nullthrows's own stack frame.
    throw error;
}
$2342a1a76ff50050$exports = $2342a1a76ff50050$var$nullthrows;
$2342a1a76ff50050$exports.default = $2342a1a76ff50050$var$nullthrows;
Object.defineProperty($2342a1a76ff50050$exports, '__esModule', {
    value: true
});




const $86a3ba4eb3a17970$var$instances = new Map();
let $86a3ba4eb3a17970$var$id = 0;
class $86a3ba4eb3a17970$export$3048eb7ec07c2c4e {
    _numWorkerInstances = 0;
    _workerRegisterResolves = [];
    _emitter = new ($parcel$interopDefault($ki5hV$events))();
    constructor(workerFarm){
        this.farm = workerFarm;
        this.dirs = new Map([
            [
                '/',
                new $86a3ba4eb3a17970$var$Directory()
            ]
        ]);
        this.files = new Map();
        this.symlinks = new Map();
        this.watchers = new Map();
        this.events = [];
        this.id = $86a3ba4eb3a17970$var$id++;
        this._cwd = '/';
        this._workerHandles = [];
        this._eventQueue = [];
        $86a3ba4eb3a17970$var$instances.set(this.id, this);
        this._emitter.on('allWorkersRegistered', ()=>{
            for (let resolve of this._workerRegisterResolves)resolve();
            this._workerRegisterResolves = [];
        });
    }
    static deserialize(opts) {
        let existing = $86a3ba4eb3a17970$var$instances.get(opts.id);
        if (existing != null) {
            // Correct the count of worker instances since serialization assumes a new instance is created
            ($parcel$interopDefault($ki5hV$parcelworkers)).getWorkerApi().runHandle(opts.handle, [
                'decrementWorkerInstance',
                []
            ]);
            return existing;
        }
        let fs = new $86a3ba4eb3a17970$var$WorkerFS(opts.id, (/*@__PURE__*/$parcel$interopDefault($2342a1a76ff50050$exports))(opts.handle));
        fs.dirs = opts.dirs;
        fs.files = opts.files;
        fs.symlinks = opts.symlinks;
        return fs;
    }
    serialize() {
        if (!this.handle) this.handle = this.farm.createReverseHandle((fn, args)=>{
            // $FlowFixMe
            return this[fn](...args);
        });
         // If a worker instance already exists, it will decrement this number
        this._numWorkerInstances++;
        return {
            $$raw: false,
            id: this.id,
            handle: this.handle,
            dirs: this.dirs,
            files: this.files,
            symlinks: this.symlinks
        };
    }
    decrementWorkerInstance() {
        this._numWorkerInstances--;
        if (this._numWorkerInstances === this._workerHandles.length) this._emitter.emit('allWorkersRegistered');
    }
    cwd() {
        return this._cwd;
    }
    chdir(dir) {
        this._cwd = dir;
    }
    _normalizePath(filePath, realpath = true) {
        filePath = ($parcel$interopDefault($ki5hV$path)).resolve(this.cwd(), filePath); // get realpath by following symlinks
        if (realpath) {
            let { root: root , dir: dir , base: base  } = ($parcel$interopDefault($ki5hV$path)).parse(filePath);
            let parts = dir.slice(root.length).split(($parcel$interopDefault($ki5hV$path)).sep).concat(base);
            let res = root;
            for (let part of parts){
                res = ($parcel$interopDefault($ki5hV$path)).join(res, part);
                let symlink = this.symlinks.get(res);
                if (symlink) res = symlink;
            }
            return res;
        }
        return filePath;
    }
    async writeFile(filePath, contents, options) {
        filePath = this._normalizePath(filePath);
        if (this.dirs.has(filePath)) throw new $86a3ba4eb3a17970$var$FSError('EISDIR', filePath, 'is a directory');
        let dir = ($parcel$interopDefault($ki5hV$path)).dirname(filePath);
        if (!this.dirs.has(dir)) throw new $86a3ba4eb3a17970$var$FSError('ENOENT', dir, 'does not exist');
        let buffer = $86a3ba4eb3a17970$var$makeShared(contents);
        let file = this.files.get(filePath);
        let mode = options && options.mode || 438;
        if (file) {
            file.write(buffer, mode);
            this.files.set(filePath, file);
        } else this.files.set(filePath, new $86a3ba4eb3a17970$var$File(buffer, mode));
        await this._sendWorkerEvent({
            type: 'writeFile',
            path: filePath,
            entry: this.files.get(filePath)
        });
        this._triggerEvent({
            type: file ? 'update' : 'create',
            path: filePath
        });
    }
    async readFile(filePath, encoding) {
        return this.readFileSync(filePath, encoding);
    }
    readFileSync(filePath, encoding) {
        filePath = this._normalizePath(filePath);
        let file = this.files.get(filePath);
        if (file == null) throw new $86a3ba4eb3a17970$var$FSError('ENOENT', filePath, 'does not exist');
        let buffer = file.read();
        if (encoding) return buffer.toString(encoding);
        return buffer;
    }
    async copyFile(source, destination) {
        let contents = await this.readFile(source);
        await this.writeFile(destination, contents);
    }
    statSync(filePath) {
        filePath = this._normalizePath(filePath);
        let dir = this.dirs.get(filePath);
        if (dir) return dir.stat();
        let file = this.files.get(filePath);
        if (file == null) throw new $86a3ba4eb3a17970$var$FSError('ENOENT', filePath, 'does not exist');
        return file.stat();
    }
    async stat(filePath) {
        return this.statSync(filePath);
    }
    readdirSync(dir, opts) {
        dir = this._normalizePath(dir);
        if (!this.dirs.has(dir)) throw new $86a3ba4eb3a17970$var$FSError('ENOENT', dir, 'does not exist');
        dir += ($parcel$interopDefault($ki5hV$path)).sep;
        let res = [];
        for (let [filePath, entry] of this.dirs)if (filePath.startsWith(dir) && filePath.indexOf(($parcel$interopDefault($ki5hV$path)).sep, dir.length) === -1) {
            let name = filePath.slice(dir.length);
            if (opts === null || opts === void 0 ? void 0 : opts.withFileTypes) res.push(new $86a3ba4eb3a17970$var$Dirent(name, entry));
            else res.push(name);
        }
        for (let [filePath1, entry1] of this.files)if (filePath1.startsWith(dir) && filePath1.indexOf(($parcel$interopDefault($ki5hV$path)).sep, dir.length) === -1) {
            let name = filePath1.slice(dir.length);
            if (opts === null || opts === void 0 ? void 0 : opts.withFileTypes) res.push(new $86a3ba4eb3a17970$var$Dirent(name, entry1));
            else res.push(name);
        }
        for (let [from] of this.symlinks)if (from.startsWith(dir) && from.indexOf(($parcel$interopDefault($ki5hV$path)).sep, dir.length) === -1) {
            let name = from.slice(dir.length);
            if (opts === null || opts === void 0 ? void 0 : opts.withFileTypes) res.push(new $86a3ba4eb3a17970$var$Dirent(name, {
                mode: $86a3ba4eb3a17970$var$S_IFLNK
            }));
            else res.push(name);
        }
        return res;
    }
    async readdir(dir, opts) {
        return this.readdirSync(dir, opts);
    }
    async unlink(filePath) {
        filePath = this._normalizePath(filePath);
        if (!this.files.has(filePath) && !this.dirs.has(filePath)) throw new $86a3ba4eb3a17970$var$FSError('ENOENT', filePath, 'does not exist');
        this.files.delete(filePath);
        this.dirs.delete(filePath);
        this.watchers.delete(filePath);
        await this._sendWorkerEvent({
            type: 'unlink',
            path: filePath
        });
        this._triggerEvent({
            type: 'delete',
            path: filePath
        });
        return Promise.resolve();
    }
    async mkdirp(dir) {
        dir = this._normalizePath(dir);
        if (this.dirs.has(dir)) return Promise.resolve();
        if (this.files.has(dir)) throw new $86a3ba4eb3a17970$var$FSError('ENOENT', dir, 'is not a directory');
        let root = ($parcel$interopDefault($ki5hV$path)).parse(dir).root;
        while(dir !== root){
            if (this.dirs.has(dir)) break;
            this.dirs.set(dir, new $86a3ba4eb3a17970$var$Directory());
            await this._sendWorkerEvent({
                type: 'mkdir',
                path: dir
            });
            this._triggerEvent({
                type: 'create',
                path: dir
            });
            dir = ($parcel$interopDefault($ki5hV$path)).dirname(dir);
        }
        return Promise.resolve();
    }
    async rimraf(filePath) {
        filePath = this._normalizePath(filePath);
        if (this.dirs.has(filePath)) {
            let dir = filePath + ($parcel$interopDefault($ki5hV$path)).sep;
            for (let filePath3 of this.files.keys())if (filePath3.startsWith(dir)) {
                this.files.delete(filePath3);
                await this._sendWorkerEvent({
                    type: 'unlink',
                    path: filePath3
                });
                this._triggerEvent({
                    type: 'delete',
                    path: filePath3
                });
            }
            for (let dirPath of this.dirs.keys())if (dirPath.startsWith(dir)) {
                this.dirs.delete(dirPath);
                this.watchers.delete(dirPath);
                await this._sendWorkerEvent({
                    type: 'unlink',
                    path: filePath
                });
                this._triggerEvent({
                    type: 'delete',
                    path: dirPath
                });
            }
            for (let filePath2 of this.symlinks.keys())if (filePath2.startsWith(dir)) {
                this.symlinks.delete(filePath2);
                await this._sendWorkerEvent({
                    type: 'unlink',
                    path: filePath2
                });
            }
            this.dirs.delete(filePath);
            await this._sendWorkerEvent({
                type: 'unlink',
                path: filePath
            });
            this._triggerEvent({
                type: 'delete',
                path: filePath
            });
        } else if (this.files.has(filePath)) {
            this.files.delete(filePath);
            await this._sendWorkerEvent({
                type: 'unlink',
                path: filePath
            });
            this._triggerEvent({
                type: 'delete',
                path: filePath
            });
        }
        return Promise.resolve();
    }
    async ncp(source, destination) {
        source = this._normalizePath(source);
        if (this.dirs.has(source)) {
            if (!this.dirs.has(destination)) {
                this.dirs.set(destination, new $86a3ba4eb3a17970$var$Directory());
                await this._sendWorkerEvent({
                    type: 'mkdir',
                    path: destination
                });
                this._triggerEvent({
                    type: 'create',
                    path: destination
                });
            }
            let dir = source + ($parcel$interopDefault($ki5hV$path)).sep;
            for (let dirPath of this.dirs.keys())if (dirPath.startsWith(dir)) {
                let destName = ($parcel$interopDefault($ki5hV$path)).join(destination, dirPath.slice(dir.length));
                if (!this.dirs.has(destName)) {
                    this.dirs.set(destName, new $86a3ba4eb3a17970$var$Directory());
                    await this._sendWorkerEvent({
                        type: 'mkdir',
                        path: destination
                    });
                    this._triggerEvent({
                        type: 'create',
                        path: destName
                    });
                }
            }
            for (let [filePath, file] of this.files)if (filePath.startsWith(dir)) {
                let destName = ($parcel$interopDefault($ki5hV$path)).join(destination, filePath.slice(dir.length));
                let exists = this.files.has(destName);
                this.files.set(destName, file);
                await this._sendWorkerEvent({
                    type: 'writeFile',
                    path: destName,
                    entry: file
                });
                this._triggerEvent({
                    type: exists ? 'update' : 'create',
                    path: destName
                });
            }
        } else await this.copyFile(source, destination);
    }
    createReadStream(filePath) {
        return new $86a3ba4eb3a17970$var$ReadStream(this, filePath);
    }
    createWriteStream(filePath, options) {
        return new $86a3ba4eb3a17970$var$WriteStream(this, filePath, options);
    }
    realpathSync(filePath) {
        return this._normalizePath(filePath);
    }
    async realpath(filePath) {
        return this.realpathSync(filePath);
    }
    async symlink(target, path) {
        target = this._normalizePath(target);
        path = this._normalizePath(path);
        this.symlinks.set(path, target);
        await this._sendWorkerEvent({
            type: 'symlink',
            path: path,
            target: target
        });
    }
    existsSync(filePath) {
        filePath = this._normalizePath(filePath);
        return this.files.has(filePath) || this.dirs.has(filePath);
    }
    async exists(filePath) {
        return this.existsSync(filePath);
    }
    _triggerEvent(event) {
        this.events.push(event);
        if (this.watchers.size === 0) return;
         // Batch events
        this._eventQueue.push(event);
        clearTimeout(this._watcherTimer);
        this._watcherTimer = setTimeout(()=>{
            let events = this._eventQueue;
            this._eventQueue = [];
            for (let [dir, watchers] of this.watchers){
                if (!dir.endsWith(($parcel$interopDefault($ki5hV$path)).sep)) dir += ($parcel$interopDefault($ki5hV$path)).sep;
                if (event.path.startsWith(dir)) for (let watcher of watchers)watcher.trigger(events);
            }
        }, 50);
    }
    _registerWorker(handle) {
        this._workerHandles.push(handle);
        if (this._numWorkerInstances === this._workerHandles.length) this._emitter.emit('allWorkersRegistered');
    }
    async _sendWorkerEvent(event) {
        // Wait for worker instances to register their handles
        while(this._workerHandles.length < this._numWorkerInstances)await new Promise((resolve)=>this._workerRegisterResolves.push(resolve)
        );
        await Promise.all(this._workerHandles.map((workerHandle)=>this.farm.workerApi.runHandle(workerHandle, [
                event
            ])
        ));
    }
    watch(dir, fn, opts) {
        dir = this._normalizePath(dir);
        let watcher = new $86a3ba4eb3a17970$var$Watcher(fn, opts);
        let watchers = this.watchers.get(dir);
        if (!watchers) {
            watchers = new Set();
            this.watchers.set(dir, watchers);
        }
        watchers.add(watcher);
        return Promise.resolve({
            unsubscribe: ()=>{
                watchers = (/*@__PURE__*/$parcel$interopDefault($2342a1a76ff50050$exports))(watchers);
                watchers.delete(watcher);
                if (watchers.size === 0) this.watchers.delete(dir);
                return Promise.resolve();
            }
        });
    }
    async getEventsSince(dir, snapshot, opts) {
        let contents = await this.readFile(snapshot, 'utf8');
        let len = Number(contents);
        let events = this.events.slice(len);
        let ignore = opts.ignore;
        if (ignore) events = events.filter((event)=>!ignore.some((i)=>event.path.startsWith(i + ($parcel$interopDefault($ki5hV$path)).sep)
            )
        );
        return events;
    }
    async writeSnapshot(dir, snapshot) {
        await this.writeFile(snapshot, '' + this.events.length);
    }
    findAncestorFile(fileNames, fromDir, root) {
        return $792f6c711e82470e$export$d51a93c758976388(this, fileNames, fromDir, root);
    }
    findNodeModule(moduleName, fromDir) {
        return $792f6c711e82470e$export$4c6d088a7d7f9947(this, moduleName, fromDir);
    }
    findFirstFile(filePaths) {
        return $792f6c711e82470e$export$64df6e3182fd5b2d(this, filePaths);
    }
}
class $86a3ba4eb3a17970$var$Watcher {
    constructor(fn, options){
        this.fn = fn;
        this.options = options;
    }
    trigger(events) {
        let ignore = this.options.ignore;
        if (ignore) events = events.filter((event)=>!ignore.some((i)=>event.path.startsWith(i + ($parcel$interopDefault($ki5hV$path)).sep)
            )
        );
        if (events.length > 0) this.fn(null, events);
    }
}
class $86a3ba4eb3a17970$var$FSError extends Error {
    constructor(code, path, message){
        var ref;
        super(`${code}: ${path} ${message}`);
        this.name = 'FSError';
        this.code = code;
        this.path = path;
        (ref = Error.captureStackTrace) === null || ref === void 0 ? void 0 : ref.call(Error, this, this.constructor);
    }
}
class $86a3ba4eb3a17970$var$ReadStream extends $ki5hV$stream.Readable {
    constructor(fs, filePath){
        super();
        this.fs = fs;
        this.filePath = filePath;
        this.reading = false;
        this.bytesRead = 0;
    }
    _read() {
        if (this.reading) return;
        this.reading = true;
        this.fs.readFile(this.filePath).then((res)=>{
            this.bytesRead += res.byteLength;
            this.push(res);
            this.push(null);
        }, (err)=>{
            this.emit('error', err);
        });
    }
}
class $86a3ba4eb3a17970$var$WriteStream extends $ki5hV$stream.Writable {
    constructor(fs, filePath, options){
        super({
            emitClose: true,
            autoDestroy: true
        });
        this.fs = fs;
        this.filePath = filePath;
        this.options = options;
        this.buffer = Buffer.alloc(0);
    }
    _write(chunk, encoding, callback) {
        let c = typeof chunk === 'string' ? Buffer.from(chunk, encoding) : chunk;
        this.buffer = Buffer.concat([
            this.buffer,
            c
        ]);
        callback();
    }
    _final(callback) {
        this.fs.writeFile(this.filePath, this.buffer, this.options).then(callback).catch(callback);
    }
}
const $86a3ba4eb3a17970$var$S_IFREG = 32768;
const $86a3ba4eb3a17970$var$S_IFDIR = 16384;
const $86a3ba4eb3a17970$var$S_IFLNK = 40960;
class $86a3ba4eb3a17970$var$Entry {
    constructor(mode){
        this.mode = mode;
        let now = Date.now();
        this.atime = now;
        this.mtime = now;
        this.ctime = now;
        this.birthtime = now;
    }
    access() {
        let now = Date.now();
        this.atime = now;
        this.ctime = now;
    }
    modify(mode) {
        let now = Date.now();
        this.mtime = now;
        this.ctime = now;
        this.mode = mode;
    }
    getSize() {
        return 0;
    }
    stat() {
        return new $86a3ba4eb3a17970$var$Stat(this);
    }
}
class $86a3ba4eb3a17970$var$Stat {
    dev = 0;
    ino = 0;
    nlink = 0;
    uid = 0;
    gid = 0;
    rdev = 0;
    blksize = 0;
    blocks = 0;
    constructor(entry){
        this.mode = entry.mode;
        this.size = entry.getSize();
        this.atimeMs = entry.atime;
        this.mtimeMs = entry.mtime;
        this.ctimeMs = entry.ctime;
        this.birthtimeMs = entry.birthtime;
        this.atime = new Date(entry.atime);
        this.mtime = new Date(entry.mtime);
        this.ctime = new Date(entry.ctime);
        this.birthtime = new Date(entry.birthtime);
    }
    isFile() {
        return Boolean(this.mode & $86a3ba4eb3a17970$var$S_IFREG);
    }
    isDirectory() {
        return Boolean(this.mode & $86a3ba4eb3a17970$var$S_IFDIR);
    }
    isBlockDevice() {
        return false;
    }
    isCharacterDevice() {
        return false;
    }
    isSymbolicLink() {
        return false;
    }
    isFIFO() {
        return false;
    }
    isSocket() {
        return false;
    }
}
class $86a3ba4eb3a17970$var$Dirent {
    #mode;
    constructor(name, entry){
        this.name = name;
        this.#mode = entry.mode;
    }
    isFile() {
        return Boolean(this.#mode & $86a3ba4eb3a17970$var$S_IFREG);
    }
    isDirectory() {
        return Boolean(this.#mode & $86a3ba4eb3a17970$var$S_IFDIR);
    }
    isBlockDevice() {
        return false;
    }
    isCharacterDevice() {
        return false;
    }
    isSymbolicLink() {
        return Boolean(this.#mode & $86a3ba4eb3a17970$var$S_IFLNK);
    }
    isFIFO() {
        return false;
    }
    isSocket() {
        return false;
    }
}
class $86a3ba4eb3a17970$var$File extends $86a3ba4eb3a17970$var$Entry {
    constructor(buffer, mode){
        super($86a3ba4eb3a17970$var$S_IFREG | mode);
        this.buffer = buffer;
    }
    read() {
        super.access();
        return Buffer.from(this.buffer);
    }
    write(buffer, mode) {
        super.modify($86a3ba4eb3a17970$var$S_IFREG | mode);
        this.buffer = buffer;
    }
    getSize() {
        return this.buffer.byteLength;
    }
}
class $86a3ba4eb3a17970$var$Directory extends $86a3ba4eb3a17970$var$Entry {
    constructor(){
        super($86a3ba4eb3a17970$var$S_IFDIR);
    }
}
function $86a3ba4eb3a17970$var$makeShared(contents) {
    if (typeof contents !== 'string' && contents.buffer instanceof $ki5hV$parcelutils.SharedBuffer) return contents;
    let length = Buffer.byteLength(contents);
    let shared = new $ki5hV$parcelutils.SharedBuffer(length);
    let buffer = Buffer.from(shared);
    if (typeof contents === 'string') buffer.write(contents);
    else buffer.set(contents);
    return buffer;
}
class $86a3ba4eb3a17970$var$WorkerFS extends $86a3ba4eb3a17970$export$3048eb7ec07c2c4e {
    constructor(id, handle){
        // TODO Make this not a subclass
        // $FlowFixMe
        super();
        this.id = id;
        this.handleFn = (methodName, args)=>($parcel$interopDefault($ki5hV$parcelworkers)).getWorkerApi().runHandle(handle, [
                methodName,
                args
            ])
        ;
        this.handleFn('_registerWorker', [
            ($parcel$interopDefault($ki5hV$parcelworkers)).getWorkerApi().createReverseHandle((event)=>{
                switch(event.type){
                    case 'writeFile':
                        this.files.set(event.path, event.entry);
                        break;
                    case 'unlink':
                        this.files.delete(event.path);
                        this.dirs.delete(event.path);
                        this.symlinks.delete(event.path);
                        break;
                    case 'mkdir':
                        this.dirs.set(event.path, new $86a3ba4eb3a17970$var$Directory());
                        break;
                    case 'symlink':
                        this.symlinks.set(event.path, event.target);
                        break;
                }
            })
        ]);
    }
    static deserialize(opts) {
        return (/*@__PURE__*/$parcel$interopDefault($2342a1a76ff50050$exports))($86a3ba4eb3a17970$var$instances.get(opts.id));
    }
    serialize() {
        // $FlowFixMe
        return {
            id: this.id
        };
    }
    writeFile(filePath, contents, options) {
        super.writeFile(filePath, contents, options);
        let buffer = $86a3ba4eb3a17970$var$makeShared(contents);
        return this.handleFn('writeFile', [
            filePath,
            buffer,
            options
        ]);
    }
    unlink(filePath) {
        super.unlink(filePath);
        return this.handleFn('unlink', [
            filePath
        ]);
    }
    mkdirp(dir) {
        super.mkdirp(dir);
        return this.handleFn('mkdirp', [
            dir
        ]);
    }
    rimraf(filePath) {
        super.rimraf(filePath);
        return this.handleFn('rimraf', [
            filePath
        ]);
    }
    ncp(source, destination) {
        super.ncp(source, destination);
        return this.handleFn('ncp', [
            source,
            destination
        ]);
    }
    symlink(target, path) {
        super.symlink(target, path);
        return this.handleFn('symlink', [
            target,
            path
        ]);
    }
}
$ki5hV$parcelcore.registerSerializableClass(`${(/*@__PURE__*/$parcel$interopDefault($46772b835b3d1aed$exports)).version}:MemoryFS`, $86a3ba4eb3a17970$export$3048eb7ec07c2c4e);
$ki5hV$parcelcore.registerSerializableClass(`${(/*@__PURE__*/$parcel$interopDefault($46772b835b3d1aed$exports)).version}:WorkerFS`, $86a3ba4eb3a17970$var$WorkerFS);
$ki5hV$parcelcore.registerSerializableClass(`${(/*@__PURE__*/$parcel$interopDefault($46772b835b3d1aed$exports)).version}:Stat`, $86a3ba4eb3a17970$var$Stat);
$ki5hV$parcelcore.registerSerializableClass(`${(/*@__PURE__*/$parcel$interopDefault($46772b835b3d1aed$exports)).version}:File`, $86a3ba4eb3a17970$var$File);
$ki5hV$parcelcore.registerSerializableClass(`${(/*@__PURE__*/$parcel$interopDefault($46772b835b3d1aed$exports)).version}:Directory`, $86a3ba4eb3a17970$var$Directory);


var $ff96e39fd0cf388b$exports = {};

$parcel$export($ff96e39fd0cf388b$exports, "OverlayFS", () => $ff96e39fd0cf388b$export$5963299e2424ca1c);



function $ff96e39fd0cf388b$var$read(method) {
    return async function(...args) {
        try {
            return await this.writable[method](...args);
        } catch (err) {
            return this.readable[method](...args);
        }
    };
}
function $ff96e39fd0cf388b$var$readSync(method) {
    return function(...args) {
        try {
            return this.writable[method](...args);
        } catch (err) {
            return this.readable[method](...args);
        }
    };
}
function $ff96e39fd0cf388b$var$write(method) {
    return function(...args) {
        return this.writable[method](...args);
    };
}
function $ff96e39fd0cf388b$var$checkExists(method) {
    return function(filePath, ...args) {
        if (this.writable.existsSync(filePath)) return this.writable[method](filePath, ...args);
        return this.readable[method](filePath, ...args);
    };
}
class $ff96e39fd0cf388b$export$5963299e2424ca1c {
    constructor(writable, readable){
        this.writable = writable;
        this.readable = readable;
    }
    static deserialize(opts) {
        return new $ff96e39fd0cf388b$export$5963299e2424ca1c(opts.writable, opts.readable);
    }
    serialize() {
        return {
            $$raw: false,
            writable: this.writable,
            readable: this.readable
        };
    }
    readFile = $ff96e39fd0cf388b$var$read('readFile');
    writeFile = $ff96e39fd0cf388b$var$write('writeFile');
    async copyFile(source, destination) {
        if (await this.writable.exists(source)) await this.writable.writeFile(destination, await this.writable.readFile(source));
        else await this.writable.writeFile(destination, await this.readable.readFile(source));
    }
    stat = $ff96e39fd0cf388b$var$read('stat');
    unlink = $ff96e39fd0cf388b$var$write('unlink');
    mkdirp = $ff96e39fd0cf388b$var$write('mkdirp');
    rimraf = $ff96e39fd0cf388b$var$write('rimraf');
    ncp = $ff96e39fd0cf388b$var$write('ncp');
    createReadStream = $ff96e39fd0cf388b$var$checkExists('createReadStream');
    createWriteStream = $ff96e39fd0cf388b$var$write('createWriteStream');
    cwd = $ff96e39fd0cf388b$var$readSync('cwd');
    chdir = $ff96e39fd0cf388b$var$readSync('chdir');
    realpath = $ff96e39fd0cf388b$var$checkExists('realpath');
    readFileSync = $ff96e39fd0cf388b$var$readSync('readFileSync');
    statSync = $ff96e39fd0cf388b$var$readSync('statSync');
    existsSync = $ff96e39fd0cf388b$var$readSync('existsSync');
    realpathSync = $ff96e39fd0cf388b$var$checkExists('realpathSync');
    async exists(filePath) {
        return await this.writable.exists(filePath) || this.readable.exists(filePath);
    }
    async readdir(path, opts) {
        // Read from both filesystems and merge the results
        let writable = [];
        let readable = [];
        try {
            writable = await this.writable.readdir(path, opts);
        } catch (err) {
        }
        try {
            readable = await this.readable.readdir(path, opts);
        } catch (err1) {
        }
        return Array.from(new Set([
            ...writable,
            ...readable
        ]));
    }
    readdirSync(path, opts) {
        // Read from both filesystems and merge the results
        let writable = [];
        let readable = [];
        try {
            writable = this.writable.readdirSync(path, opts);
        } catch (err) {
        }
        try {
            readable = this.readable.readdirSync(path, opts);
        } catch (err2) {
        }
        return Array.from(new Set([
            ...writable,
            ...readable
        ]));
    }
    async watch(dir, fn, opts) {
        let writableSubscription = await this.writable.watch(dir, fn, opts);
        let readableSubscription = await this.readable.watch(dir, fn, opts);
        return {
            unsubscribe: async ()=>{
                await writableSubscription.unsubscribe();
                await readableSubscription.unsubscribe();
            }
        };
    }
    async getEventsSince(dir, snapshot, opts) {
        let writableEvents = await this.writable.getEventsSince(dir, snapshot, opts);
        let readableEvents = await this.readable.getEventsSince(dir, snapshot, opts);
        return [
            ...writableEvents,
            ...readableEvents
        ];
    }
    async writeSnapshot(dir, snapshot, opts) {
        await this.writable.writeSnapshot(dir, snapshot, opts);
    }
    findAncestorFile(fileNames, fromDir, root) {
        return $792f6c711e82470e$export$d51a93c758976388(this, fileNames, fromDir, root);
    }
    findNodeModule(moduleName, fromDir) {
        return $792f6c711e82470e$export$4c6d088a7d7f9947(this, moduleName, fromDir);
    }
    findFirstFile(filePaths) {
        return $792f6c711e82470e$export$64df6e3182fd5b2d(this, filePaths);
    }
}
$ki5hV$parcelcore.registerSerializableClass(`${(/*@__PURE__*/$parcel$interopDefault($46772b835b3d1aed$exports)).version}:OverlayFS`, $ff96e39fd0cf388b$export$5963299e2424ca1c);


async function $e46c9778a96a2930$export$d3a8044e3fef7335(sourceFS, source, destinationFS, destination) {
    await destinationFS.mkdirp(destination);
    let files = await sourceFS.readdir(source);
    for (let file of files){
        let sourcePath = ($parcel$interopDefault($ki5hV$path)).join(source, file);
        let destPath = ($parcel$interopDefault($ki5hV$path)).join(destination, file);
        let stats = await sourceFS.stat(sourcePath);
        if (stats.isFile()) await new Promise((resolve, reject)=>{
            sourceFS.createReadStream(sourcePath).pipe(destinationFS.createWriteStream(destPath)).on('finish', ()=>resolve()
            ).on('error', reject);
        });
        else if (stats.isDirectory()) await $e46c9778a96a2930$export$d3a8044e3fef7335(sourceFS, sourcePath, destinationFS, destPath);
    }
}
$parcel$exportWildcard(module.exports, $10145ab9dc478fed$exports);
$parcel$exportWildcard(module.exports, $86a3ba4eb3a17970$exports);
$parcel$exportWildcard(module.exports, $ff96e39fd0cf388b$exports);


//# sourceMappingURL=index.js.map
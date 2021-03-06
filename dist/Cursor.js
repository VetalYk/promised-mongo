'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _readableStream = require('readable-stream');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Cursor = (function (_Readable) {
  _inherits(Cursor, _Readable);

  function Cursor(collection, namespace, command, options) {
    _classCallCheck(this, Cursor);

    _get(Object.getPrototypeOf(Cursor.prototype), 'constructor', this).call(this, { objectMode: true, highWaterMark: 0 });
    this.db = collection.db;
    this.collection = collection;
    this.namespace = namespace;
    this.command = command;
    this.options = options;
  }

  _createClass(Cursor, [{
    key: 'batchSize',
    value: function batchSize(n) {
      this.command.batchSize = n;
      return this;
    }
  }, {
    key: 'connect',
    value: function connect() {
      return _regeneratorRuntime.async(function connect$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (this._cursor) {
              context$2$0.next = 7;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.db.connect());

          case 3:
            context$2$0.t0 = this.namespace;
            context$2$0.t1 = this.command;
            context$2$0.t2 = this.options;
            this._cursor = context$2$0.sent.cursor(context$2$0.t0, context$2$0.t1, context$2$0.t2);

          case 7:
            return context$2$0.abrupt('return', this._cursor);

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'count',
    value: function count() {
      var result;
      return _regeneratorRuntime.async(function count$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.collection.runCommand('count', { query: this.command.query }));

          case 2:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', result.n);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      return _regeneratorRuntime.async(function destroy$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (this.cursor) {
              cursor.close();
            }

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'explain',
    value: function explain() {
      return _regeneratorRuntime.async(function explain$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            this.command.query = { $query: this.command.query || {}, $explain: 1 };
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.next());

          case 3:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'forEach',
    value: function forEach(action) {
      var item;
      return _regeneratorRuntime.async(function forEach$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            item = null;

          case 1:
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.next());

          case 3:
            if (!(item = context$2$0.sent)) {
              context$2$0.next = 7;
              break;
            }

            action(item);
            context$2$0.next = 1;
            break;

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'forEachAsync',
    value: function forEachAsync(action) {
      var item;
      return _regeneratorRuntime.async(function forEachAsync$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            item = null;

          case 1:
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.next());

          case 3:
            if (!(item = context$2$0.sent)) {
              context$2$0.next = 8;
              break;
            }

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(action(item));

          case 6:
            context$2$0.next = 1;
            break;

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'limit',
    value: function limit(n) {
      this.command.limit = n;
      return this;
    }
  }, {
    key: 'map',
    value: function map(mapFunction) {
      var result, item;
      return _regeneratorRuntime.async(function map$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            result = [];
            item = null;

          case 2:
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.next());

          case 4:
            if (!(item = context$2$0.sent)) {
              context$2$0.next = 8;
              break;
            }

            result.push(mapFunction(item));
            context$2$0.next = 2;
            break;

          case 8:
            return context$2$0.abrupt('return', result);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'next',
    value: function next() {
      var cursor;
      return _regeneratorRuntime.async(function next$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.connect());

          case 2:
            cursor = context$2$0.sent;
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(new _bluebird2['default'](function (resolve, reject) {
              cursor.next(function (error, result) {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            }));

          case 5:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'rewind',
    value: function rewind() {
      var cursor;
      return _regeneratorRuntime.async(function rewind$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.connect());

          case 2:
            cursor = context$2$0.sent;

            cursor.rewind();

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'size',
    value: function size() {
      var options, result;
      return _regeneratorRuntime.async(function size$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            options = _lodash2['default'].pick(this.command, ['query', 'limit', 'skip']);
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.collection.runCommand('count', options));

          case 3:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', result.n);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'skip',
    value: function skip(n) {
      this.command.skip = n;
      return this;
    }
  }, {
    key: 'sort',
    value: function sort(sortObject) {
      this.command.sort = sortObject;
      return this;
    }
  }, {
    key: 'then',
    value: function then() {
      // allows awaiting collection.find() directly.
      var promise = this.toArray();
      return promise.then.apply(promise, Array.prototype.slice.call(arguments));
    }
  }, {
    key: 'toArray',
    value: function toArray() {
      var result, item;
      return _regeneratorRuntime.async(function toArray$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            result = [];
            item = null;

          case 2:
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.next());

          case 4:
            if (!(item = context$2$0.sent)) {
              context$2$0.next = 8;
              break;
            }

            result.push(item);
            context$2$0.next = 2;
            break;

          case 8:
            return context$2$0.abrupt('return', result);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: '_read',
    value: function _read() {
      var self = this;
      self.next().then(function (data) {
        self.push(data);
      }, function (error) {
        self.emit('error', error);
      });
    }
  }]);

  return Cursor;
})(_readableStream.Readable);

exports['default'] = Cursor;
;
module.exports = exports['default'];

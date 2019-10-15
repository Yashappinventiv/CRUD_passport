"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis = __importStar(require("redis"));
var client = redis.createClient();
var util_1 = require("util");
client.on("error", function (err) {
    console.log("Error " + err);
});
var getAsync = util_1.promisify(client.hget).bind(client);
function joinGroupRoom(roomName, userInfor) {
    return __awaiter(this, void 0, void 0, function () {
        var joindata, joindataParse, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("reached 1");
                    return [4 /*yield*/, getAsync(roomName, 'users')];
                case 1:
                    joindata = _a.sent();
                    if (joindata) {
                        joindataParse = JSON.parse(joindata);
                        joindataParse.users.push(userInfor);
                        joindataParse.activeUser.push(userInfor);
                        client.hset(roomName, 'users', JSON.stringify(joindataParse));
                        return [2 /*return*/, joindataParse.activeUser];
                    }
                    else {
                        data = { message: [], activeUser: [userInfor], users: [] };
                        client.hset(roomName, 'users', JSON.stringify(data));
                        return [2 /*return*/, data.activeUser];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.joinGroupRoom = joinGroupRoom;
function messageGroup(roomName, userInfor) {
    return __awaiter(this, void 0, void 0, function () {
        var messagedata, parseMessagedata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("reached 2");
                    return [4 /*yield*/, getAsync(roomName, 'users')];
                case 1:
                    messagedata = _a.sent();
                    if (messagedata) {
                        parseMessagedata = JSON.parse(messagedata);
                        parseMessagedata.message.push(userInfor);
                        client.hset(roomName, 'users', JSON.stringify(parseMessagedata));
                        return [2 /*return*/];
                    }
                    else {
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.messageGroup = messageGroup;
function joinSingleRoom(roomName) {
    return __awaiter(this, void 0, void 0, function () {
        var joindata, x, currentUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAsync(roomName, 'users')];
                case 1:
                    joindata = _a.sent();
                    if (joindata) {
                        x = JSON.parse(joindata);
                        currentUser = x.users.length;
                        return [2 /*return*/, currentUser.toString()];
                    }
                    return [2 /*return*/, '0'];
            }
        });
    });
}
exports.joinSingleRoom = joinSingleRoom;

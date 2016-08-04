
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDiposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}

/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "50c1d24aec010cfd7584"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotMainModule = true; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			hotMainModule = false;
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				Object.defineProperty(fn, name, (function(name) {
/******/ 					return {
/******/ 						configurable: true,
/******/ 						enumerable: true,
/******/ 						get: function() {
/******/ 							return __webpack_require__[name];
/******/ 						},
/******/ 						set: function(value) {
/******/ 							__webpack_require__[name] = value;
/******/ 						}
/******/ 					};
/******/ 				}(name)));
/******/ 			}
/******/ 		}
/******/ 		Object.defineProperty(fn, "e", {
/******/ 			enumerable: true,
/******/ 			value: function(chunkId) {
/******/ 				if(hotStatus === "ready")
/******/ 					hotSetStatus("prepare");
/******/ 				hotChunksLoading++;
/******/ 				return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 					finishChunkLoading();
/******/ 					throw err;
/******/ 				});
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		});
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotMainModule,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotMainModule = true;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				}
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					}
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						}
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = function() {
/******/ 						console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 					};
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					dependency = moduleOutdatedDependencies[j];
/******/ 					idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(16)(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("serve-static");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

var PORT, SCALE, app, ref;

ref = process.env, PORT = ref.PORT, SCALE = ref.SCALE;

app = __webpack_require__(4);

app.listen(PORT, function() {
  return console.log("Express listening on port " + PORT);
});


/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
  module.hot.accept(function(err) {
    console.log('[HMR] Error accepting: ' + err);
  });

  var getEvalSource = function(func) {
    var code = func.toString();
    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
    if(!m) {
      return null;
    }
    var args = m[1];
    var body = m[2];
    var scope = {};

    if(args.trim()) {
      args.split(',').forEach(function(arg) {
        if(arg.indexOf('=') !== -1) {
          var p = arg.split('=');
          scope[p[0].trim()] = JSON.parse(p[1]);
        }
        else {
          scope[arg.trim()] = undefined;
        }
      });
    }

    return { body: body, scope: scope };
  }

  var injectScope = function(scope, code) {
    // Take an explicit scope object and inject it so that
    // `code` runs in context of it
    var injected = Object.keys(scope).map(function(binding) {
      return 'var ' + binding + ' = evalScope.' + binding + ';'
    }).join(' ');

    // Update our scope object with any modifications
    var extracted = Object.keys(scope).map(function(binding) {
      return 'evalScope.' + binding + ' = ' + binding + ';';
    }).join(' ');

    return injected + code + extracted;
  }

  var bindings = __moduleBindings;

  if(!module.hot.data) {
    // First time loading. Try and patch something.
    var patchedBindings = {};
    var evalScope = {};

    var moduleEvalWithScope = function(frame) {
      // Update the scope to reflect only the values specified as
      // arguments to the __eval function. Copy over values from the
      // existing scope and ignore the rest.
      Object.keys(evalScope).forEach(function(arg) {
        if(arg in frame.scope) {
          frame.scope[arg] = evalScope[arg];
        }
      });
      evalScope = frame.scope;

      var code = injectScope(evalScope, frame.body);
      return eval(code);
    }

    var moduleEval = function(code) {
      return eval(code);
    }

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        var patched = function() {
          if(patchedBindings[binding]) {
            return patchedBindings[binding].apply(this, arguments);
          }
          else {
            return f.apply(this, arguments);
          }
        };
        patched.prototype = f.prototype;

        eval(binding + ' = patched;\n');

        if(module.exports[binding]) {
          module.exports[binding] = patched;
        }
      }
    });

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = moduleEval;
      data.moduleEvalWithScope = moduleEvalWithScope;
    });
  }
  else {
    var patchedBindings = module.hot.data.patchedBindings;

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        // We need to reify the function in the original module so
        // it references any of the original state. Strip the name
        // and simply eval it.
        var funcCode = (
          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
        );
        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
      }
    });

    if(typeof __eval === 'function') {
      try {
        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
      }
      catch(e) {
        console.log('error evaling: ' + e);
      }
    }

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = module.hot.data.moduleEval;
      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
    });
  }
}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);

	function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) console.log("[HMR] Update applied.");
					return;
				}
				__webpack_require__(9)(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					console.warn("[HMR] Cannot apply update.");
					console.warn("[HMR] " + err.stack || err.message);
					console.warn("[HMR] You need to restart the application!");
				} else {
					console.warn("[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	}
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

var Express, admin, api, app, body, cookie, logger, resolve, routes, serve, session;

Express = __webpack_require__(0);

serve = __webpack_require__(1);

resolve = __webpack_require__(14).resolve;

routes = global.routes;

session = __webpack_require__(12);

cookie = __webpack_require__(11);

logger = __webpack_require__(13);

body = __webpack_require__(10);

api = __webpack_require__(7);

admin = __webpack_require__(5);

app = new Express;

if (true) {
  app.use(logger('dev'));
}

app.use(serve('public'));

app.use(body.urlencoded({
  extended: false
}));

app.use(body.json());

app.use('/api', api);

app.use('/admin', admin);

module.exports = app;


/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
  module.hot.accept(function(err) {
    console.log('[HMR] Error accepting: ' + err);
  });

  var getEvalSource = function(func) {
    var code = func.toString();
    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
    if(!m) {
      return null;
    }
    var args = m[1];
    var body = m[2];
    var scope = {};

    if(args.trim()) {
      args.split(',').forEach(function(arg) {
        if(arg.indexOf('=') !== -1) {
          var p = arg.split('=');
          scope[p[0].trim()] = JSON.parse(p[1]);
        }
        else {
          scope[arg.trim()] = undefined;
        }
      });
    }

    return { body: body, scope: scope };
  }

  var injectScope = function(scope, code) {
    // Take an explicit scope object and inject it so that
    // `code` runs in context of it
    var injected = Object.keys(scope).map(function(binding) {
      return 'var ' + binding + ' = evalScope.' + binding + ';'
    }).join(' ');

    // Update our scope object with any modifications
    var extracted = Object.keys(scope).map(function(binding) {
      return 'evalScope.' + binding + ' = ' + binding + ';';
    }).join(' ');

    return injected + code + extracted;
  }

  var bindings = __moduleBindings;

  if(!module.hot.data) {
    // First time loading. Try and patch something.
    var patchedBindings = {};
    var evalScope = {};

    var moduleEvalWithScope = function(frame) {
      // Update the scope to reflect only the values specified as
      // arguments to the __eval function. Copy over values from the
      // existing scope and ignore the rest.
      Object.keys(evalScope).forEach(function(arg) {
        if(arg in frame.scope) {
          frame.scope[arg] = evalScope[arg];
        }
      });
      evalScope = frame.scope;

      var code = injectScope(evalScope, frame.body);
      return eval(code);
    }

    var moduleEval = function(code) {
      return eval(code);
    }

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        var patched = function() {
          if(patchedBindings[binding]) {
            return patchedBindings[binding].apply(this, arguments);
          }
          else {
            return f.apply(this, arguments);
          }
        };
        patched.prototype = f.prototype;

        eval(binding + ' = patched;\n');

        if(module.exports[binding]) {
          module.exports[binding] = patched;
        }
      }
    });

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = moduleEval;
      data.moduleEvalWithScope = moduleEvalWithScope;
    });
  }
  else {
    var patchedBindings = module.hot.data.patchedBindings;

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        // We need to reify the function in the original module so
        // it references any of the original state. Strip the name
        // and simply eval it.
        var funcCode = (
          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
        );
        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
      }
    });

    if(typeof __eval === 'function') {
      try {
        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
      }
      catch(e) {
        console.log('error evaling: ' + e);
      }
    }

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = module.hot.data.moduleEval;
      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
    });
  }
}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

var Router, router, serve;

Router = __webpack_require__(0).Router;

serve = __webpack_require__(1);

router = new Router;

router.use('/', serve('node_modules/admin-lte'));

module.exports = router;


/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
  module.hot.accept(function(err) {
    console.log('[HMR] Error accepting: ' + err);
  });

  var getEvalSource = function(func) {
    var code = func.toString();
    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
    if(!m) {
      return null;
    }
    var args = m[1];
    var body = m[2];
    var scope = {};

    if(args.trim()) {
      args.split(',').forEach(function(arg) {
        if(arg.indexOf('=') !== -1) {
          var p = arg.split('=');
          scope[p[0].trim()] = JSON.parse(p[1]);
        }
        else {
          scope[arg.trim()] = undefined;
        }
      });
    }

    return { body: body, scope: scope };
  }

  var injectScope = function(scope, code) {
    // Take an explicit scope object and inject it so that
    // `code` runs in context of it
    var injected = Object.keys(scope).map(function(binding) {
      return 'var ' + binding + ' = evalScope.' + binding + ';'
    }).join(' ');

    // Update our scope object with any modifications
    var extracted = Object.keys(scope).map(function(binding) {
      return 'evalScope.' + binding + ' = ' + binding + ';';
    }).join(' ');

    return injected + code + extracted;
  }

  var bindings = __moduleBindings;

  if(!module.hot.data) {
    // First time loading. Try and patch something.
    var patchedBindings = {};
    var evalScope = {};

    var moduleEvalWithScope = function(frame) {
      // Update the scope to reflect only the values specified as
      // arguments to the __eval function. Copy over values from the
      // existing scope and ignore the rest.
      Object.keys(evalScope).forEach(function(arg) {
        if(arg in frame.scope) {
          frame.scope[arg] = evalScope[arg];
        }
      });
      evalScope = frame.scope;

      var code = injectScope(evalScope, frame.body);
      return eval(code);
    }

    var moduleEval = function(code) {
      return eval(code);
    }

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        var patched = function() {
          if(patchedBindings[binding]) {
            return patchedBindings[binding].apply(this, arguments);
          }
          else {
            return f.apply(this, arguments);
          }
        };
        patched.prototype = f.prototype;

        eval(binding + ' = patched;\n');

        if(module.exports[binding]) {
          module.exports[binding] = patched;
        }
      }
    });

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = moduleEval;
      data.moduleEvalWithScope = moduleEvalWithScope;
    });
  }
  else {
    var patchedBindings = module.hot.data.patchedBindings;

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        // We need to reify the function in the original module so
        // it references any of the original state. Strip the name
        // and simply eval it.
        var funcCode = (
          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
        );
        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
      }
    });

    if(typeof __eval === 'function') {
      try {
        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
      }
      catch(e) {
        console.log('error evaling: ' + e);
      }
    }

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = module.hot.data.moduleEval;
      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
    });
  }
}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var Router, pg, router;

Router = __webpack_require__(0).Router;

router = new Router;

pg = __webpack_require__(15);

pg.defaults.ssl = true;

router.get('/', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  return pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) {
      throw err;
    }
    return client.query('select table_schema,table_name from information_schema.tables').on('row', function(row) {
      return res.write(JSON.stringify(row));
    });
  });
});

module.exports = router;


/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
  module.hot.accept(function(err) {
    console.log('[HMR] Error accepting: ' + err);
  });

  var getEvalSource = function(func) {
    var code = func.toString();
    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
    if(!m) {
      return null;
    }
    var args = m[1];
    var body = m[2];
    var scope = {};

    if(args.trim()) {
      args.split(',').forEach(function(arg) {
        if(arg.indexOf('=') !== -1) {
          var p = arg.split('=');
          scope[p[0].trim()] = JSON.parse(p[1]);
        }
        else {
          scope[arg.trim()] = undefined;
        }
      });
    }

    return { body: body, scope: scope };
  }

  var injectScope = function(scope, code) {
    // Take an explicit scope object and inject it so that
    // `code` runs in context of it
    var injected = Object.keys(scope).map(function(binding) {
      return 'var ' + binding + ' = evalScope.' + binding + ';'
    }).join(' ');

    // Update our scope object with any modifications
    var extracted = Object.keys(scope).map(function(binding) {
      return 'evalScope.' + binding + ' = ' + binding + ';';
    }).join(' ');

    return injected + code + extracted;
  }

  var bindings = __moduleBindings;

  if(!module.hot.data) {
    // First time loading. Try and patch something.
    var patchedBindings = {};
    var evalScope = {};

    var moduleEvalWithScope = function(frame) {
      // Update the scope to reflect only the values specified as
      // arguments to the __eval function. Copy over values from the
      // existing scope and ignore the rest.
      Object.keys(evalScope).forEach(function(arg) {
        if(arg in frame.scope) {
          frame.scope[arg] = evalScope[arg];
        }
      });
      evalScope = frame.scope;

      var code = injectScope(evalScope, frame.body);
      return eval(code);
    }

    var moduleEval = function(code) {
      return eval(code);
    }

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        var patched = function() {
          if(patchedBindings[binding]) {
            return patchedBindings[binding].apply(this, arguments);
          }
          else {
            return f.apply(this, arguments);
          }
        };
        patched.prototype = f.prototype;

        eval(binding + ' = patched;\n');

        if(module.exports[binding]) {
          module.exports[binding] = patched;
        }
      }
    });

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = moduleEval;
      data.moduleEvalWithScope = moduleEvalWithScope;
    });
  }
  else {
    var patchedBindings = module.hot.data.patchedBindings;

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        // We need to reify the function in the original module so
        // it references any of the original state. Strip the name
        // and simply eval it.
        var funcCode = (
          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
        );
        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
      }
    });

    if(typeof __eval === 'function') {
      try {
        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
      }
      catch(e) {
        console.log('error evaling: ' + e);
      }
    }

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = module.hot.data.moduleEval;
      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
    });
  }
}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var Router, db, protect, router;

Router = __webpack_require__(0).Router;

router = new Router;

db = __webpack_require__(6);

protect = __webpack_require__(8);

router.use('/db', db);

router.get('/', function(req, res) {
  return res.json({
    message: 'asga Hasglo, world 21'
  });
});

router.post('/', function(req, res) {
  var id;
  id = req.body.id;
  console.log(id);
  return res.json(id);
});

router.get('/isprod', function(req, res) {
  var NODE_ENV;
  NODE_ENV = "";
  console.log(NODE_ENV);
  return res.json({
    production: NODE_ENV
  });
});

module.exports = router;


/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
  module.hot.accept(function(err) {
    console.log('[HMR] Error accepting: ' + err);
  });

  var getEvalSource = function(func) {
    var code = func.toString();
    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
    if(!m) {
      return null;
    }
    var args = m[1];
    var body = m[2];
    var scope = {};

    if(args.trim()) {
      args.split(',').forEach(function(arg) {
        if(arg.indexOf('=') !== -1) {
          var p = arg.split('=');
          scope[p[0].trim()] = JSON.parse(p[1]);
        }
        else {
          scope[arg.trim()] = undefined;
        }
      });
    }

    return { body: body, scope: scope };
  }

  var injectScope = function(scope, code) {
    // Take an explicit scope object and inject it so that
    // `code` runs in context of it
    var injected = Object.keys(scope).map(function(binding) {
      return 'var ' + binding + ' = evalScope.' + binding + ';'
    }).join(' ');

    // Update our scope object with any modifications
    var extracted = Object.keys(scope).map(function(binding) {
      return 'evalScope.' + binding + ' = ' + binding + ';';
    }).join(' ');

    return injected + code + extracted;
  }

  var bindings = __moduleBindings;

  if(!module.hot.data) {
    // First time loading. Try and patch something.
    var patchedBindings = {};
    var evalScope = {};

    var moduleEvalWithScope = function(frame) {
      // Update the scope to reflect only the values specified as
      // arguments to the __eval function. Copy over values from the
      // existing scope and ignore the rest.
      Object.keys(evalScope).forEach(function(arg) {
        if(arg in frame.scope) {
          frame.scope[arg] = evalScope[arg];
        }
      });
      evalScope = frame.scope;

      var code = injectScope(evalScope, frame.body);
      return eval(code);
    }

    var moduleEval = function(code) {
      return eval(code);
    }

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        var patched = function() {
          if(patchedBindings[binding]) {
            return patchedBindings[binding].apply(this, arguments);
          }
          else {
            return f.apply(this, arguments);
          }
        };
        patched.prototype = f.prototype;

        eval(binding + ' = patched;\n');

        if(module.exports[binding]) {
          module.exports[binding] = patched;
        }
      }
    });

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = moduleEval;
      data.moduleEvalWithScope = moduleEvalWithScope;
    });
  }
  else {
    var patchedBindings = module.hot.data.patchedBindings;

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        // We need to reify the function in the original module so
        // it references any of the original state. Strip the name
        // and simply eval it.
        var funcCode = (
          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
        );
        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
      }
    });

    if(typeof __eval === 'function') {
      try {
        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
      }
      catch(e) {
        console.log('error evaling: ' + e);
      }
    }

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = module.hot.data.moduleEval;
      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
    });
  }
}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var Router, router;

Router = __webpack_require__(0).Router;

router = new Router;

router.get('/', function(req, res) {
  return console.log('123');
});


/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
  module.hot.accept(function(err) {
    console.log('[HMR] Error accepting: ' + err);
  });

  var getEvalSource = function(func) {
    var code = func.toString();
    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
    if(!m) {
      return null;
    }
    var args = m[1];
    var body = m[2];
    var scope = {};

    if(args.trim()) {
      args.split(',').forEach(function(arg) {
        if(arg.indexOf('=') !== -1) {
          var p = arg.split('=');
          scope[p[0].trim()] = JSON.parse(p[1]);
        }
        else {
          scope[arg.trim()] = undefined;
        }
      });
    }

    return { body: body, scope: scope };
  }

  var injectScope = function(scope, code) {
    // Take an explicit scope object and inject it so that
    // `code` runs in context of it
    var injected = Object.keys(scope).map(function(binding) {
      return 'var ' + binding + ' = evalScope.' + binding + ';'
    }).join(' ');

    // Update our scope object with any modifications
    var extracted = Object.keys(scope).map(function(binding) {
      return 'evalScope.' + binding + ' = ' + binding + ';';
    }).join(' ');

    return injected + code + extracted;
  }

  var bindings = __moduleBindings;

  if(!module.hot.data) {
    // First time loading. Try and patch something.
    var patchedBindings = {};
    var evalScope = {};

    var moduleEvalWithScope = function(frame) {
      // Update the scope to reflect only the values specified as
      // arguments to the __eval function. Copy over values from the
      // existing scope and ignore the rest.
      Object.keys(evalScope).forEach(function(arg) {
        if(arg in frame.scope) {
          frame.scope[arg] = evalScope[arg];
        }
      });
      evalScope = frame.scope;

      var code = injectScope(evalScope, frame.body);
      return eval(code);
    }

    var moduleEval = function(code) {
      return eval(code);
    }

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        var patched = function() {
          if(patchedBindings[binding]) {
            return patchedBindings[binding].apply(this, arguments);
          }
          else {
            return f.apply(this, arguments);
          }
        };
        patched.prototype = f.prototype;

        eval(binding + ' = patched;\n');

        if(module.exports[binding]) {
          module.exports[binding] = patched;
        }
      }
    });

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = moduleEval;
      data.moduleEvalWithScope = moduleEvalWithScope;
    });
  }
  else {
    var patchedBindings = module.hot.data.patchedBindings;

    bindings.forEach(function(binding) {
      var f = eval(binding);

      if(typeof f === 'function' && binding !== '__eval') {
        // We need to reify the function in the original module so
        // it references any of the original state. Strip the name
        // and simply eval it.
        var funcCode = (
          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
        );
        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
      }
    });

    if(typeof __eval === 'function') {
      try {
        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
      }
      catch(e) {
        console.log('error evaling: ' + e);
      }
    }

    module.hot.dispose(function(data) {
      data.patchedBindings = patchedBindings;
      data.moduleEval = module.hot.data.moduleEval;
      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
    });
  }
}


/***/ },
/* 9 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});

	if(unacceptedModules.length > 0) {
		console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			console.warn("[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		console.log("[HMR] Nothing hot updated.");
	} else {
		console.log("[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			console.log("[HMR]  - " + moduleId);
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			console.log("[HMR] Consider using the NamedModulesPlugin for module names.")
	}
};


/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("cookie-parser");

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("express-session");

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("morgan");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("pg");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
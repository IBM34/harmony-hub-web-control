const HarmonyHub = require('harmonyhub-api').HarmonyHub;
const express = require('express');
const app = express();
const hubRoute = express.Router();
var http = require('http');

// Hub model
let Hub = require('../models/hub.model');

// Add Hub
hubRoute.route('/create').post((req, res, next) => {
  const hub = new HarmonyHub(req.body.ip, req.body.remoteId);
  hub.connect()
    .then((config) => {
        Hub.create(req.body, (error, data) => {
            if (error) {
            return next(error)
            } else {
            res.json(data)
            }
        })
    });
});

// Get All Hubs
hubRoute.route('/').get((req, res) => {
  Hub.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Hub
hubRoute.route('/read/:id').get((req, res) => {
  Hub.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Hub
hubRoute.route('/update/:id').put((req, res, next) => {
  Hub.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Hub
hubRoute.route('/delete/:id').delete((req, res, next) => {
  Hub.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Get Hub config
hubRoute.route('/hub/:id/config').get((req, res) => {
    Hub.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error)
        } else {
            const hub = new HarmonyHub(data.ip, data.remoteId);
            hub.connect()
              .then((config) => {
                res.json(config);
              })
        }
      })
})

// Send device command
hubRoute.route('/hub/:hubId/device/:deviceId/command/:commandName').get((req, res) => {
    Hub.findById(req.params.hubId, (error, data) => {
        if (error) {
          return next(error)
        } else {
            const hub = new HarmonyHub(data.ip, data.remoteId);
            hub.connect()
              .then((config) => {
                hub.holdCommand(req.params.commandName,req.params.deviceId,1);
                res.status(200).json();
              })
        }
      })
})


// Send hue command
hubRoute.route('/hub/:hubId/hue').post((req, res) => {
  Hub.findById(req.params.hubId, (error, data) => {
      if (error) {
        return next(error)
      } else {
          const hub = new HarmonyHub(data.ip, data.remoteId);
          hub.connect()
            .then((config) => {
              let powerState = req.params.powerState == 1 ? true : false;
              let hueName = req.params.hueName;
              hub.sendRequest('harmony.automation?setstate', req.body);
              res.status(200).json();
            })
      }
    })
})

// get hue config
hubRoute.route('/hub/:hubId/hue/config').get((req, res) => {
  Hub.findById(req.params.hubId, (error, data) => {
      if (error) {
        return next(error)
      } else {
          const hub = new HarmonyHub(data.ip, data.remoteId);
          hub.connect()
            .then((config) => {
              return hub.sendRequestAndWaitResponse('harmony.automation?getstate')
              .then(message => res.json(message.data));
            })
      }
    })
})

// get hub remote id
hubRoute.route('/remoteId/:hubIp').get((req, res) => {
  requestHub(req.params.hubIp)
    .then(function (data) {
      res.json(data);
  })
})

/**
 * Get informations of the hub
 *
 * @param host The host or ip of the hub
 * @returns A json object containing informations of the hub
 */
function requestHub(host) {
  return new Promise(function (resolve, reject) {
      var body = JSON.stringify({"id ": 1,"cmd": "setup.account?getProvisionInfo","params": {}});
      var options = {
          method: 'POST',
          host: host,
          port: 8088,
          path: '/',
          headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(body),
              'Origin': 'http://sl.dhg.myharmony.com',
              'Accept-Charset': 'utf-8'
          }
      };
      var req = http.request(options, function (res) {
          var chunks = [];
          res.on('data', function (chunk) { return chunks.push(chunk); });
          res.on('end', function () {
              var response = Buffer.concat(chunks).toString();
              if (res.statusCode === 200) {
                  var data = JSON.parse(response).data;
                  resolve(data);
              }
              else {
                  reject({
                      statusCode: res.statusCode,
                      statusMessage: res.statusMessage,
                      body: response
                  });
              }
          });
      });
      req.on('error', reject);
      req.write(body);
      req.end();
  });
}



module.exports = hubRoute;
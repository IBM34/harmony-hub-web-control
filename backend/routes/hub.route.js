const HarmonyHub = require('harmonyhub-api').HarmonyHub;
const express = require('express');
const app = express();
const hubRoute = express.Router();

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
                hub.sendCommand(req.params.commandName,req.params.deviceId);
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


module.exports = hubRoute;
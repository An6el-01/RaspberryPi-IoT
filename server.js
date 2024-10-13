const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: '***',
    secretAccessKey: '***'
  }
});

const app = express();
const port = 4000;

const mqttBrokerAddress = 'mqtt://172.18.176.30';
const mqttPublishChannel = 'pi';
const mqttSubscribeChannel = 'expoApp';

app.use(bodyParser.json());


app.get('/toggleDevice', (req, res) => {
  const { deviceName, command } = req.body;

  switch(deviceName) {
    case "Desk Lamp":
      smartplug_topic = "deskLamp";
      break;
  case "Heater":
      smartplug_topic = "heater";
      break;
  case "Fan":
      smartplug_topic = "fan";
      break;
  case "Camera":
      smartplug_topic = "camera";
      break;
  default:
      smartplug_topic = "deskLamp"; 
      break;
  }

  const message = `cmnd/${smartPlug_topic}/${command}`;

  const client = mqtt.connect(mqttBrokerAddress);

  client.on('connect', () => {
    client.publish(mqttPublishChannel, message, (err) => {
      if (err) {
        console.error('Error publishing message:', err);
        return res.status(500).send('Error publishing message');
      }
      console.log(`Message published to ${mqttPublishChannel}: ${message}`);
      client.end();
      return res.status(200).send('Message published successfully');
    });
  });

  client.on('error', (err) => {
    console.error('Error connecting to MQTT broker:', err);
    return res.status(500).send('Error connecting to MQTT broker');
  });
});

app.get('/CaptureImage', (req, res) => {
  const fileWriteStream = fs.createWriteStream('image.jpg');

  const client = mqtt.connect(mqttBrokerAddress);
  const message = "cmnd/camera/Capture Image"

  client.subscribe(mqttSubscribeChannel, async (err) => {
    if (err){
      return res.status(500).send('Error subscribing to channel');
    } else{
      await client.publish(mqttPublishChannel, message, () => {
        console.log(`Message published to ${mqttPublishChannel}: ${message}`);
      });
    }
  });

  setTimeout(async () => {
    try {
      console.log('Starting to retrieve');
      const data = await s3Client.send(new GetObjectCommand({
        Bucket: 'dissertation-bucket',
        Key: 'captured_image.jpg',
      }));
      console.log("past bucket & key bit");
      let responseDataChunks = [];
      data.Body.on('data', chunk => {
        console.log('writing');
        fileWriteStream.write(chunk);
        console.log("response");
        responseDataChunks.push(chunk);
      });
      await data.Body.once('end', () => {
        fileWriteStream.end();
        const imageDataBase64String = Buffer.concat(responseDataChunks).toString('base64');
        client.end();
        return res.status(200).send(imageDataBase64String);
      });
    } catch (error) {
      console.error('Error retrieving object from S3: ', error);
      return res.status(500).send('Error retrieving object from S3');
    }
  }, 10000); 
});

app.get('/toggleDevice-allOff', (req, res) => {
  const devices = ['deskLamp', 'fan', 'heater'];
  const client = mqtt.connect(mqttBrokerAddress);
  
  client.subscribe(mqttSubscribeChannel, async (err) => {
    if (err){
      return res.status(500).send('Error subscribing to channel');
    } else{
      for (const device of devices) {
        const message = `cmnd/${device}/Power OFF`;
        await client.publish(mqttPublishChannel, message);
        console.log(`Message published to ${device}: ${message}`);
      }
      }
    });
  });

app.get('/toggleDevice-deskLamp-on', (req, res) => {
  const client = mqtt.connect(mqttBrokerAddress);
  const message = "cmnd/deskLamp/Power ON"

  client.subscribe(mqttSubscribeChannel, async (err) => {
    if (err){
      return res.status(500).send('Error subscribing to channel');
    } else{
      await client.publish(mqttPublishChannel, message, () => {
        console.log(`Message published to deskLamp: ${message}`);
      });
    }
  });
});
app.get('/toggleDevice-deskLamp-off', (req, res) => {
  const client = mqtt.connect(mqttBrokerAddress);
  const message = "cmnd/deskLamp/Power OFF"

  client.subscribe(mqttSubscribeChannel, async (err) => {
    if (err){
      return res.status(500).send('Error subscribing to channel');
    } else{
      await client.publish(mqttPublishChannel, message, () => {
        console.log(`Message published to ${mqttPublishChannel}: ${message}`);
      });
    }
  });
});
app.get('/toggleDevice-fan-on', (req, res) => {
  const client = mqtt.connect(mqttBrokerAddress);
  const message = "cmnd/fan/Power ON"

  client.subscribe(mqttSubscribeChannel, async (err) => {
    if (err){
      return res.status(500).send('Error subscribing to channel');
    } else{
      await client.publish(mqttPublishChannel, message, () => {
        console.log(`Message published to fan: ${message}`);
      });
    }
  });
});
app.get('/toggleDevice-fan-off', (req, res) => {
  const client = mqtt.connect(mqttBrokerAddress);
  const message = "cmnd/fan/Power OFF"

  client.subscribe(mqttSubscribeChannel, async (err) => {
    if (err){
      return res.status(500).send('Error subscribing to channel');
    } else{
      await client.publish(mqttPublishChannel, message, () => {
        console.log(`Message published to ${mqttPublishChannel}: ${message}`);
      });
    }
  });
});
app.get('/toggleDevice-heater-on', (req, res) => {
  const client = mqtt.connect(mqttBrokerAddress);
  const message = "cmnd/heater/Power ON"

  client.subscribe(mqttSubscribeChannel, async (err) => {
    if (err){
      return res.status(500).send('Error subscribing to channel');
    } else{
      await client.publish(mqttPublishChannel, message, () => {
        console.log(`Message published to deskLamp: ${message}`);
      });
    }
  });
});
app.get('/toggleDevice-heater-off', (req, res) => {
  const client = mqtt.connect(mqttBrokerAddress);
  const message = "cmnd/heater/Power OFF"

  client.subscribe(mqttSubscribeChannel, async (err) => {
    if (err){
      return res.status(500).send('Error subscribing to channel');
    } else{
      await client.publish(mqttPublishChannel, message, () => {
        console.log(`Message published to ${mqttPublishChannel}: ${message}`);
      });
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp();
//Notifications Function

exports.Notifications = functions.firestore
    .document('notifications/{title}')
    .onUpdate(async event => {
        
    
    const data = event.after.data();

    const payload ={
        notification: {
        title: data.title,
        body: data.message,
        image: ''
        }
    }


   

    // ref to the device collection for the user
    const db = admin.firestore();
    const devicesRef = db.collection('devices');


    // get the user's tokens and send notifications
    const devices = await devicesRef.get();

    let tokens: Array<any> = [];

    // send a notification to each device token
    devices.forEach(result => {
      const token = result.data().token;

      tokens.push( token )
    })
    return admin.messaging().sendToDevice(tokens, payload)

    });
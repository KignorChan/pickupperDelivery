//
//  BackgroundTaskManager.m
//  pickupperDelivery
//
//  Created by 陈启亮 on 2018-12-19.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "BackgroundTaskManager.h"
#import "React/RCTBridge.h"
#import "React/RCTEventDispatcher.h"
//#import <CoreLocation/CoreLocation.h>

@implementation BackgroundTaskManager
dispatch_queue_t backgroundQueque;
//NSTimer *TimeOfActiveUser;
//CLLocationManager *locationManager;

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loadInBackground){
  backgroundQueque = dispatch_queue_create("com.moduscreate.bgqueue", NULL);
  
  dispatch_async(backgroundQueque, ^{
    NSLog(@"Progressing background");
    [self.bridge.eventDispatcher sendAppEventWithName:@"backgroundProgress" body:@{@"status": @"loading"}];
    
    
    [NSThread sleepForTimeInterval:5];
    NSLog(@"Slept");
    
//    for (int i = 1; i <= 1000000; i++)
//    {
//      NSLog(@"%d", i);
//    }
//    TimeOfActiveUser = [NSTimer scheduledTimerWithTimeInterval:10.0 target:self selector:@selector(actionTimer) userInfo:nil repeats:YES];

    
    dispatch_async(dispatch_get_main_queue(), ^{
      NSLog(@"Done processing main thread!");
      [self.bridge.eventDispatcher sendAppEventWithName:@"backgroundProgress" body:@{@"status": @"done"}];
    });
  });
}

RCT_EXPORT_METHOD(stopBackground){
  dispatch_suspend(backgroundQueque);
//  [TimeOfActiveUser invalidate];
}

//-(void)actionTimer
//{
//  NSLog(@"TTTTTTTTTTTTTT");
//
//  locationManager = [[CLLocationManager alloc]init]; // initializing locationManager
//  [locationManager requestAlwaysAuthorization];
//  locationManager.desiredAccuracy = kCLLocationAccuracyBest; // setting the accuracy
//  //locationManager.delegate = self; // we set the delegate of locationManager to self.
//  //[locationManager startUpdatingLocation];  //requesting location updates
//  locationManager.allowsBackgroundLocationUpdates = true;
//
//
//  NSString* latitude = [NSString stringWithFormat:@"%.8f",locationManager.location.coordinate.latitude];
//  NSString* longitude = [NSString stringWithFormat:@"%.8f",locationManager.location.coordinate.longitude];
//  NSString* altitude = [NSString stringWithFormat:@"%.0f m",locationManager.location.altitude];
//  NSString* speed = [NSString stringWithFormat:@"%.1f m/s", locationManager.location.speed];
//
//  NSLog(@"Lat: %@", latitude);
//  NSLog(@"Lon: %@", longitude);
//  NSLog(@"Alt: %@", altitude);
//  NSLog(@"Spd: %@", speed);
//
//}


@end

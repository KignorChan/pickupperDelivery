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
#import <CoreLocation/CoreLocation.h>



@implementation BackgroundTaskManager
dispatch_queue_t backgroundQueque;
NSTimer *TimeOfActiveUser;
CLLocationManager *locationManager;
NSString* deliveryManId;

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loadInBackground:(NSString*)deliveryId){
  backgroundQueque = dispatch_queue_create("com.pickupperdelivery.bgqueue", NULL);
  
  dispatch_async(backgroundQueque, ^{
    NSLog(@"Progressing background");
    [self.bridge.eventDispatcher sendAppEventWithName:@"backgroundProgress" body:@{@"status": @"loading"}];
    
    deliveryManId = deliveryId;
    
    dispatch_async(dispatch_get_main_queue(), ^{
      NSLog(@"Done processing main thread!");
      
      [self.bridge.eventDispatcher sendAppEventWithName:@"backgroundProgress" body:@{@"status": @"done"}];
      [TimeOfActiveUser invalidate];
      TimeOfActiveUser = [NSTimer scheduledTimerWithTimeInterval:4.0 target:self selector:@selector(actionTimer) userInfo:nil repeats:YES];
      [[NSRunLoop mainRunLoop] addTimer:TimeOfActiveUser forMode:NSDefaultRunLoopMode];
    });
  });
}

RCT_EXPORT_METHOD(stopBackground){
  [TimeOfActiveUser invalidate];
//  TimeOfActiveUser = nil;
//  dispatch_suspend(backgroundQueque);

  NSLog(@"SIGNOUT");

}

-(void)actionTimer
{
  NSLog(@"TTTTTTTTTTTTTT");

  locationManager = [[CLLocationManager alloc]init]; // initializing locationManager
  [locationManager requestAlwaysAuthorization];
  locationManager.desiredAccuracy = kCLLocationAccuracyBest; // setting the accuracy
  //locationManager.delegate = self; // we set the delegate of locationManager to self.
  [locationManager startUpdatingLocation];  //requesting location updates
  locationManager.allowsBackgroundLocationUpdates = true;


  NSString* latitude = [NSString stringWithFormat:@"%.8f",locationManager.location.coordinate.latitude];
  NSString* longitude = [NSString stringWithFormat:@"%.8f",locationManager.location.coordinate.longitude];
  NSString* altitude = [NSString stringWithFormat:@"%.0f",locationManager.location.altitude];
  NSString* speed = [NSString stringWithFormat:@"%.1f", locationManager.location.speed];
  
  NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
  [formatter setDateFormat:@"YYYY-MM-dd HH:mm:ss"];
  NSString* timestamp = [formatter stringFromDate:locationManager.location.timestamp];
  
  NSLog(@"Lat: %@", latitude);
  NSLog(@"Lon: %@", longitude);
  NSLog(@"Alt: %@", altitude);
  NSLog(@"Spd: %@", speed);
  NSLog(@"Time: %@", timestamp);
  
  NSDictionary *coord = @{
                             @"accuracy":@"-1",
                             @"altitude":altitude,
                             @"latitude":latitude,
                             @"longitude":longitude,
                             @"speed":speed,
                             @"time":timestamp,
                             };
  NSLog(@"deliveryId: %@",deliveryManId);

  self.ref = [[FIRDatabase database] reference];
  
  [[[[self.ref child:@"deliveryMan"] child:deliveryManId] child:@"position"]
updateChildValues:@{@"coord": coord}];

}


@end

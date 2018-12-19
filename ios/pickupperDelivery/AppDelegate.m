/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <CoreLocation/CoreLocation.h>

@implementation AppDelegate
CLLocationManager *locationManager;
NSTimer *TimeOfActiveUser;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"pickupperDelivery"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  TimeOfActiveUser = [NSTimer scheduledTimerWithTimeInterval:4.0  target:self selector:@selector(actionTimer) userInfo:nil repeats:YES];
  
  return YES;
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
  TimeOfActiveUser = [NSTimer scheduledTimerWithTimeInterval:4.0  target:self selector:@selector(actionTimer) userInfo:nil repeats:YES];
}

-(void)actionTimer
{
  
  locationManager = [[CLLocationManager alloc]init]; // initializing locationManager
  [locationManager requestAlwaysAuthorization];
  locationManager.desiredAccuracy = kCLLocationAccuracyBest; // setting the accuracy
  locationManager.delegate = self; // we set the delegate of locationManager to self.
  [locationManager startUpdatingLocation];  //requesting location updates
  //locationManager.allowsBackgroundLocationUpdates = true;
  
  
  NSString* latitude = [NSString stringWithFormat:@"%.8f",locationManager.location.coordinate.latitude];
  NSString* longitude = [NSString stringWithFormat:@"%.8f",locationManager.location.coordinate.longitude];
  NSString* altitude = [NSString stringWithFormat:@"%.0f m",locationManager.location.altitude];
  NSString* speed = [NSString stringWithFormat:@"%.1f m/s", locationManager.location.speed];
  
  NSLog(@"Lat: %@", latitude);
  NSLog(@"Lon: %@", longitude);
  NSLog(@"Alt: %@", altitude);
  NSLog(@"Spd: %@", speed);
  
  NSLog((@"TTTTTTTT"));
  
}

- (void)applicationWillTerminate:(UIApplication *)application{
  [TimeOfActiveUser invalidate];
}

//-(void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error{
//  UIAlertView *errorAlert = [[UIAlertView alloc]initWithTitle:@"Error" message:@"There was an error retrieving your location" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil];
//  [errorAlert show];
//  NSLog(@"Error: %@",error.description);
//}
//
//-(void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
//{
//  CLLocation *crnLoc = [locations lastObject];
//  NSString* latitude = [NSString stringWithFormat:@"%.8f",crnLoc.coordinate.latitude];
//  NSString* longitude = [NSString stringWithFormat:@"%.8f",crnLoc.coordinate.longitude];
//  NSString* altitude = [NSString stringWithFormat:@"%.0f m",crnLoc.altitude];
//  NSString* speed = [NSString stringWithFormat:@"%.1f m/s", crnLoc.speed];
//
//  NSLog(@"Lat: %@", latitude);
//  NSLog(@"Lon: %@", longitude);
//  NSLog(@"Alt: %@", altitude);
//  NSLog(@"Spd: %@", speed);
//}


@end

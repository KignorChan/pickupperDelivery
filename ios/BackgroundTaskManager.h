//
//  BackgroundTaskManager.h
//  pickupperDelivery
//
//  Created by 陈启亮 on 2018-12-19.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <dispatch/dispatch.h>
#import "React/RCTBridgeModule.h"

@import Firebase;

@interface BackgroundTaskManager : NSObject <RCTBridgeModule>
  
@property (strong, nonatomic) FIRDatabaseReference *ref;


@end

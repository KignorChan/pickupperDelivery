//
//  MMLocationManager.h
//  pickupperDelivery
//
//  Created by 陈启亮 on 2018-12-19.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <CoreLocation/CoreLocation.h>

@interface MMLocationManager : CLLocationManager
+(instancetype)sharedManager;

@property (nonatomic, assign) float minSpeed;     //最小速度
@property (nonatomic, assign) float minFilter;    //最小范围
@property (nonatomic, assign) float minInteval;   //更新间隔


@end

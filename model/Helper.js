import { Dimensions } from 'react-native';
import React from 'react';


export function withContext(WrappedComponent, Context) {
  return React.forwardRef((props, ref) => (
    <Context.Consumer>
      {({ ...contextProps }) => (
        <WrappedComponent {...contextProps} {...props} forwardedRef={ref} />
      )}
    </Context.Consumer>
  ));
}


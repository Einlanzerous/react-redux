import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
  render() {
    return (
      <div>
        Secret Feature, for your eyes only!
      </div>
    )
  };
};

export default requireAuth(Feature);

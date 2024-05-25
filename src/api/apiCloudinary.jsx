import React from 'react'
import {Cloudinary} from "@cloudinary/url-gen";

const App = () => {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });
};
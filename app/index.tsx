import React from 'react';
import { Redirect } from 'expo-router';

const RedirectToHome: React.FC = () => {
  return <Redirect href="/home" />;
};

export default RedirectToHome;

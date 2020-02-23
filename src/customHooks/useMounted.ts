import React from 'react';

/**
 * Browser APIs(window and others) can be accessed only when component is mounted, because of SSR
 * @returns
 * indicator that component was mounted or not 
 */
const useMounted = (): boolean => {
  const [mountedState, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    }
  }, []);

  return mountedState;
}

export default useMounted;
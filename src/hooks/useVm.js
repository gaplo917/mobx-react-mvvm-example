import { useRef } from 'react'

/**
 * Create ref to the functional component (It will not re-run on each render)
 * @param VmConstructor
 * @param args context | obj | array
 * @return VmConstructor
 */
export function useVm(VmConstructor, args){
  let vmRef = useRef(null);
  if (!vmRef.current) {
    vmRef.current = new VmConstructor(args)
  }
  return vmRef.current;
}

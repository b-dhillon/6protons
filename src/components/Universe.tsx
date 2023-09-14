import { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';
import { TypedArray } from 'maath/dist/declarations/src/ctypes';

// Top level because we want to run the positions calculation at the very beginning. Maybe we can move it to Init?
const stars = BigBang(25000, 5);

export const Universe = memo(function (props: any): JSX.Element {
  // const star_positions = BigBang2( props.page.universe.size , props.page.universe.radius );

  const ref: any = useRef();
  useFrame((_, delta) => (ref.current.rotation.x -= delta / 30));
  // ref.current.rotation.y -= delta / 20

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <group>
        <Points
          ref={ref}
          positions={stars}
          stride={3}
          frustumCulled={false}
          {...props}
        >
          <PointMaterial
            transparent
            color='#fff'
            size={0.0035}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>
    </group>
  );
});

function BigBang(stars: number, radius: number): Float32Array {
  const p = new Float32Array(stars);
  for (let i = 0; i < stars; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const s = Math.sin(phi);
    const x = radius * s * Math.cos(theta);
    const y = radius * s * Math.sin(theta);
    const z = radius * Math.cos(phi);
    p[i] = x;
    p[i + 1] = y;
    p[i + 2] = z;
  }
  return p;
}



// function BigBang(stars: number, radius: number): TypedArray {
//   return inSphere(new Float32Array(stars), { radius: radius });
// }




















function TestPerformnance(fn: Function): any {
  const start = performance.now();
  const a = fn(10000, 10);
  const end = performance.now();
  console.log(`execution time: ${(end - start).toFixed(5)} ms`);
  return a;
}






















// size={ 0.0035 } <-- current
// size={.0045}

// TestPerformnance( BigBang );
// export memo( Universe );


// useMemo() is a React Hook. With useMemo(), we can return memoized values
// and avoid RE-rendering if the dependencies to the useMemo function have not changed.
// the dependecies should be the variables that are used in the function that is passed to useMemo().

// React.memo() is a higher-order component (HOC), which is a fancy name for a component
// that takes a component as a prop and returns a component that prevents a component from
// re-rendering if the props (or values within it) have not changed.

// const sphere = random.inSphere(new Float32Array(50000), { radius: 5 });
// const start = performance.now();
// const end = performance.now();
// console.log(`Execution Time: ${(end - start).toFixed(5)} ms`);
// create a function that returns an array of 3000 random positions inside a sphere of radius 10 centered at 0,0,0
// function randomSpherePoints(radius, count) {
//     const points =  new Float32Array(count);
//     for (let i = 0; i < count; i++) {
//       const theta = Math.random() * 2 * Math.PI;
//       const phi = Math.acos(2 * Math.random() - 1);
//       const s = Math.sin(phi);
//       const x = radius * s * Math.cos(theta);
//       const y = radius * s * Math.sin(theta);
//       const z = radius * Math.cos(phi);
//       points[i] = x;
//       points[i + 1] = y;
//       points[i + 2] = z;
//     }
//     return points;
// }

// const start = performance.now();
// const sphere2 = useMemo(() => randomSpherePoints(5, 50000), [never] );

// const end = performance.now();
// console.log(`Execution Time: ${(end - start).toFixed(5)} ms`);

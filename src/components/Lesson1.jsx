import { useState, useEffect, Suspense } from 'react';
import BottomNavBar from './lesson_navigation';
import Model from './Model'



export default function Lesson1() {


    return (
        <>
            <BottomNavBar />
            {/* <Model path={`/model${sectionState}.glb`} sectionState={sectionState} /> */}
        </>

    )
}
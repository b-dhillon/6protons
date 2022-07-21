function handleNext() 
{
    setSectionState((prevCount) => prevCount + 1)
    console.log('section state was increased');
}

function handleBack() 
{
    setSectionState((prevCount) =>
    {
        if (prevCount > 0) return prevCount - 1;
        else return prevCount;
    })
    console.log('section state was decreased');
}

const [sectionState, setSectionState] = useState(0);

<BottomNavBar sectionState={sectionState} handleBack={handleBack} handleNext={handleNext} />
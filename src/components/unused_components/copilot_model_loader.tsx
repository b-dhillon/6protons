// @ts-nocheck
export default function ModelLoader( props: any ): JSX.Element {
    const { scene, setScene, loading, setLoading } = props;
    const ref: any = useRef();
    const gltf = useLoader(GLTFLoader, data[scene].model, (loader: any) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader);
    });

    useEffect(() => {
        if (gltf.scene) {
            setScene(gltf.scene);
            setLoading(false);
        }
    }, [gltf]);

    return (
        <primitive
            ref={ref}
            object={gltf.scene}
            dispose={null}
            scale={data[scene].scale}
            position={data[scene].position}
            rotation={data[scene].rotation}
        />
    );
};
import Window from "../components/Window";

export default function Loading() {
    return (
        <Window cssMaxWidth='560px' className="loading-overlay">
            <div style={{height: '200px'}}/>
        </Window>
    );
}

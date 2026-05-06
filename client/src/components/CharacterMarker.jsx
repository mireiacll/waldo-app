// A permanent pin placed on the image when a character is correctly found
// x and y are percentages, so we use % positioning to stay accurate at any size

function CharacterMarker({ x, y, name }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 15,
      textAlign: 'center',
      pointerEvents: 'none'
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '3px solid limegreen',
        background: 'rgba(0,200,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18
      }}>
        ✓
      </div>
      <div style={{
        background: 'limegreen',
        color: 'white',
        fontSize: 11,
        padding: '2px 6px',
        borderRadius: 4,
        marginTop: 2,
        whiteSpace: 'nowrap'
      }}>
        {name}
      </div>
    </div>
  );
}

export default CharacterMarker;
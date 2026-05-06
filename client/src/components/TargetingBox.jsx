// The box + dropdown that appears when the user clicks

function TargetingBox({ x, y, characters, onSelect, onClose }) {
  return (
    <div style={{
      position: 'absolute',
      left: x - 30,   // center the box on the click point
      top: y - 30,
      width: 60,
      height: 60,
      border: '3px solid red',
      borderRadius: '50%',
      pointerEvents: 'none', // don't block clicks
      zIndex: 10
    }}>
      {/* Dropdown sits below the circle */}
      <div style={{
        position: 'absolute',
        top: 65,
        left: -20,
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: 4,
        overflow: 'hidden',
        pointerEvents: 'all', // this part DOES receive clicks
        zIndex: 20,
        minWidth: 120,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        {characters.map(name => (
          <div
            key={name}
            onClick={() => onSelect(name)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderBottom: '1px solid #eee'
            }}
            onMouseEnter={e => e.target.style.background = '#f0f0f0'}
            onMouseLeave={e => e.target.style.background = 'white'}
          >
            {name}
          </div>
        ))}
        <div
          onClick={onClose}
          style={{ padding: '8px 12px', cursor: 'pointer', color: '#999', fontSize: 12 }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default TargetingBox;
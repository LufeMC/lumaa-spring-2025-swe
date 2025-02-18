export const modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', 
    maxWidth: '500px', 
    bgcolor: 'background.paper',
    borderRadius: '12px', 
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
    p: 3,
    textAlign: 'center',
    overflow: 'hidden',
};

export const modelButton = {
    mt: 2,
    padding: '10px 20px',
    borderRadius: '25px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)',
    },
    fontFamily: "Dosis, sans-serif",
};

export const wrong = { 
    mb: 2, 
    fontWeight: 600, 
    fontSize: '1.2rem', 
    color: '#333',
    fontFamily: "Dosis, sans-serif",
};

export const errorS = { 
    mb: 3, 
    color: '#666', 
    fontSize: '1rem',
    fontFamily: "Dosis, sans-serif",
};

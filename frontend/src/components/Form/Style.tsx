export const main = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    bgcolor: "linear-gradient(135deg, #ff6f61, #6a11cb)",  
    padding: 4,
    fontFamily: "Dosis, sans-serif",
};

export const titleS = { 
    mb: 2, 
    textAlign: "center",
    fontFamily: "Dosis, sans-serif"
};

export const inputS = {
    fontFamily: "Dosis, sans-serif",  
    '& label': {
        fontFamily: "Dosis, sans-serif", 
    },
    '& input': {
        fontFamily: "Dosis, sans-serif", 
    },
};

export const form = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "#fff",
    padding: 4,
    borderRadius: 8, 
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",  
    width: "100%",
    maxWidth: 400, 
    transition: "all 0.3s ease-in-out",  
    '&:hover': {
        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",  
    },
};

export const font = {
    fontFamily: "Dosis, sans-serif",
    textAlign: "center",
    marginBottom: 2,
    fontSize: "1.25rem", 
    color: "#333", 
    letterSpacing: "1px", 
};

export const button = {
    marginTop: 3,
    marginBottom: 2,
    fontFamily: "Dosis, sans-serif",
    fontSize: "1rem",
    textTransform: "uppercase",
    color: "#fff",
    backgroundColor: "#6a11cb",  
    padding: "10px 20px",
    borderRadius: 50, 
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    '&:hover': {
        backgroundColor: "#ff6f61",  
    },
};

export const ask = {
    textAlign: "center",
    marginTop: 2,
    fontFamily: "Dosis, sans-serif",
    fontSize: "1rem",
    color: "#555",  
    letterSpacing: "0.5px",  
};

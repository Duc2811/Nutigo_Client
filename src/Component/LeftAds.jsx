import { useEffect, useState } from "react";
import { activeAds } from "../Service/Admin/AdsServices";

const LeftAdsBanner = () => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await activeAds();
        setAds(data.ads || []);
        if (data.ads.length > 0) {
          setCurrentIndex(Math.floor(Math.random() * data.ads.length));
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ads.length > 0) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * ads.length);
        } while (randomIndex === currentIndex);
        setCurrentIndex(randomIndex);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [ads, currentIndex]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 15000);
  };

  if (!isVisible || ads.length === 0) return null;

  return (
    <div
      style={{
        ...styles.banner,
        transform: 'translateY(-50%)',
      }}
    >
      <button
        style={styles.closeButton}
        onClick={handleClose}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        ×
      </button>
      <a
        href={ads[currentIndex]?.link}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        <img
          src={ads[currentIndex]?.image}
          alt="Left Ad Banner"
          style={styles.image}
        />
      </a>
    </div>
  );
};

const styles = {
  banner: {
    position: "fixed",
    left: 0,
    top: "50%",
    height: "70vh",
    width: "15vw",
    backgroundColor: "#ffffff",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    borderRadius: "0 15px 15px 0",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "10px",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#ff4444",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      background: "#ff4444",
      color: "white",
    },
  },
  link: {
    display: "block",
    width: "100%",
    height: "100%",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
};

export default LeftAdsBanner;

import toast from "react-hot-toast";

const Toast = {
    SuccessshowToast: (message: string) => {
        toast.success(message, {
            style: {
                border: "1px solid #28a745",
                padding: "16px",
                color: "#000",
                backgroundColor: "trnasparent",
            },
            iconTheme: {
                primary: "#000",
                secondary: "#28a745",
            },
        });
    },

    ErrorShowToast: (message: string) => {
        toast.error(message, {
            style: {
                border: "1px solid #FF0000",
                padding: "16px",
                color: "red",
                backgroundColor: "trnasparent",
            },
            iconTheme: {
                primary: "black",
                secondary: "#FF0000",
            },
        });
    },
};

export default Toast;

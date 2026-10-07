

const DateAndTime = () => {
    const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
    return (
        <>
             {date}
        </>
    );
};

export default DateAndTime;
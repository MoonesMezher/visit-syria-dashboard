import MainSelect from "../../components/Shared/MainSelect/MainSelect"

const Hotel = () => {
    const options = ['حمص', "حماه", "دمشق", "حلب"];
    return (
        <section>
            Hotel
            <MainSelect title="كامل القطر" options={options}/>
            <MainSelect title="ترتيب حسب" options={options}/>
        </section>
    )
}

export default Hotel
import SubjectMaterial from "./SubjectMaterial";

const SubjectMaterials = () => {
    const headings = ["Notes", "Materials", "Question Paper"]; // Use plural for clarity

    return (
        <>
            {headings.map((heading) => (
                <SubjectMaterial key={heading} topic={heading} />
            ))}
        </>
    );
};

export default SubjectMaterials;

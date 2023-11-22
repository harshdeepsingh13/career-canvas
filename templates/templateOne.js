const {generatePDF} = require("../services/puppeteer.service");
const moment = require("moment");
const style = (themeColor = "#324b57") => `
<style>
:root {
  --themeColor: ${themeColor};
  --headerBackgroundColor: #f2f2f2;
}

.ql-indent-1{
margin-left:1em;
}
.p2em {
  padding: 2em;
}

.pb2em {
  --padding: 2em;
  padding-bottom: var(--padding);
}

.pb1em {
  padding-bottom: 1em;
}

.pl1em {
  padding-left: 1em;
}

.plr2em {
  --padding: 3em;
  padding-left: var(--padding);
  padding-right: var(--padding);
}

.mtb1em {
  --margin: 1em;
  margin-top: var(--margin);
  margin-bottom: var(--margin);
}

.ptb1em {
  --padding: 1em;
  padding-top: var(--padding);
  padding-bottom: var(--padding);
}

.mtb1em {
  --margin: 1em;
  margin-top: var(--margin);
  margin-bottom: var(--margin);
}

.mb1em {
  margin-bottom: 1em;
}

.float-right {
  float: right;
}

.align-right {
  text-align: right;
}

body {
  margin: unset;
  padding: unset;
  font-size: 10px;
  font-family: "Times New Roman", Times, serif;
}

strong {
  font-weight: 600;
}

.main-section {
  padding: 1em 3em;
}

footer,
.footer-space {
  width: 100%;
}

header,
.header-space {
  width: calc(100% - 6em);
}

.header-space {
  height: 150px;
}
footer,
.footer-space {
  height: 12px;
}
header {
  height: 100px;
  position: fixed;
  top: 0;
  border-top: 10px solid var(--themeColor);
  background-color: var(--headerBackgroundColor);
}
footer {
  position: fixed;
  bottom: 0;
  height: 12px;
  background-color: var(--themeColor);
}

header h1.name {
  text-align: center;
  text-transform: uppercase;
  color: var(--themeColor);
  letter-spacing: 10px;
  font-size: 40px;
}

header .header-information {
  /*display: flex;
  align-items: center;
  justify-content: space-between;*/
  font-size: 12px;
}

.header-information .information {
  text-align: center;
  display: inline-block;
}

.header-information.item-4 .information {
    /*flex-basis: 25%;*/
    width: 24%;
}

.header-information.item-3 .information {
    /*flex-basis: 33%;*/
    width: 32%;
}

.header-information.item-2 .information{
    /*flex-basis: 50%;*/
    width: 49%;
}

.header-information.item-1 .information{
    /*flex-basis: 50%;*/
    width: 100%;
}

table.section {
  page-break-after: auto;
}
table.section tr {
  page-break-inside: avoid;
  page-break-after: auto;
}
table.section td {
  page-break-inside: avoid;
  page-break-after: auto;
}
table.section thead {
  display: table-header-group;
}
table.section tfoot {
  display: table-footer-group;
}

table {
  width: 100%;
}

table td {
  width: 100%;
}

table .content-container {
  /* margin: 0 10px; */
  /* margin-left: 10px; */
}

table .content-container > td {
  padding-left: 10px;
}

table h2 {
  text-transform: uppercase;
  /* font-weight: 500; */
  letter-spacing: 1px;
  font-size: 1.2em;
}

table .content-container .header {
  margin-bottom: 5px;
}

.section.objective {
  text-align: justify;
}

.section.skills td {
  width: 50%;
}

/*.section.skills ul {
  margin: unset;
  padding: unset;
  padding-left: 20px;
}

.section.skills li {
  padding: unset;
}*/
ul {
  margin: unset;
  padding: unset;
  padding-left: 20px;
}

ul li {
  padding: unset;
}

</style>
`

const html = (templateDetails = {}) => {
    const {
        name,
        contactNumber,
        email,
        currentLocation,
        website,
        objective,
        educationDetails,
        skills,
        workExperience,
        projects,
        trainingCertifications
    } = templateDetails;

    // let website = undefined;
    const getHeaderInformation = () => {
        const arr = [contactNumber, email, currentLocation, website].filter(item => item)

        return `<div class="${"header-information item-" + arr.length}">
            ${contactNumber ? `<div class="information">${contactNumber.contactNumber}</div>` : ""}
            ${email ? `<div class="information">${email}</div>` : ""}
            ${currentLocation ? `<div class="information">${currentLocation}</div>` : ""}
            ${website ? `<div class="information">${website}</div>` : ""}
        </div>`
    }

    const getSkills = () => {
        const printSkills = (skills) => {
            let str = ""
            skills.forEach(skill => {
                str += `<li>${skill}</li>`
            })
            return str;
        }

        if (skills.length > 5) {
            const halfIndex = skills?.length / 2 - 1;
            const firstHalf = skills?.slice(0, halfIndex);
            const secondHalf = skills?.slice(halfIndex);

            return `
                <td class="pb1em">
                    <ul>
                        ${printSkills(firstHalf)}
                    </ul>
                </td>
                <td class="pb1em">
                    <ul>
                        ${printSkills(secondHalf)}
                    </ul>
                </td>
            `
        } else {
            return `
                <td class="pb1em">
                    <ul>
                        ${printSkills(skills)}
                    </ul>
                </td>
            `
        }
    }

    const getWorkExperiences = () => {
        let str = "";
        for (let experience of workExperience) {
            str += `
                <tr class="content-container">
                    <td>
                        <table class="pb1em">
                            <tr>
                                <td class="header">
                                    <strong>${experience.position}</strong>, ${experience.company}
                                    <div class="align-right float-right">
                                        ${moment(experience.startDate).format("MMMM, YYYY")} - ${experience.isPresent ? "Present" : moment(experience.endDate).format("MMMM, YYYY")}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>${experience.location}</td>
                            </tr>
                            <tr>
                                <td>
                                    <div>${experience.responsibilities}</div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            `
        }
        return str;
    }

    const getProjects = () => {
        let str = "";

        for (let project of projects) {
            str += `
                <tr class="content-container">
                    <td>
                        <table class="pb1em">
                            <tr>
                                <td class="header">
                                    <strong>${project.name}</strong>
                                    <div class="align-right float-right"> ${moment(project.startDate).format("MMMM, YYYY")} - ${project.isPresent ? "Present" : moment(project.endDate).format("MMMM, YYYY")}</div>
                                </td>
                            </tr>
                            ${project.website ? `
                                <tr>
                                    <td>
                                        Website: <a href="${project.website}" target="_blank"> ${project.website} </a>
                                    </td>
                                </tr>
                                ` : ``
            }
                            ${project.technologyStack ? `
                                <tr>
                                    <td>
                                        Tech Stack: <em>${project.technologyStack.map(s => `<span style="text-transform:capitalize;">${s}</span>`)}</em>
                                    </td>
                                </tr>
                            ` : ``}
                            <tr>
                                <td>
                                    <div>${project.summary}</div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            `
        }
        return str;
    }

    const getCertificates = () => {
        let str = ""

        for (let certificate of trainingCertifications) {
            str += `
                <tr class="content-container">
                    <td>
                        <table class="pb1em">
                            <tr>
                                <td class="header">
                                    <strong>${certificate.name}</strong>
                                    <div class="align-right float-right"> ${moment(certificate.startDate).format("MMMM, YYYY")} - ${certificate.isPresent ? "Present" : moment(certificate.endDate).format("MMMM, YYYY")}</div>
                                </td>
                            </tr>
                            ${certificate.link ? `
                                <tr>
                                    <td>
                                        Website: <a href="${certificate.link}" target="_blank"> ${certificate.link} </a>
                                    </td>
                                </tr>
                                ` : ``
            }
                            <tr>
                                <td>
                                    <div>${certificate.summary}</div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            `
        }
        return str;
    }

    const getEducationDetails = () => {
        let str = "";
        for (let education of educationDetails) {
            str += `
                <tr class="content-container">
                    <td>
                        <table class="pb1em">
                            <tr>
                                <td class="header">
                                    <strong>${education.course}</strong>
                                    <div class="align-right float-right"> ${moment(education.startDate).format("MMMM, YYYY")} - ${education.isPresent ? "Present" : moment(education.endDate).format("MMMM, YYYY")}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>${education.instituteName}</div>
                                </td>
                            </tr>
                            ${education.university ? `
                                <tr>
                                    <td>
                                        <div>${education.university}</div>
                                    </td>
                                </tr>
                            ` : ``}
                            ${education.location ? `
                                <tr>
                                    <td>
                                        <div>${education.location}</div>
                                    </td>
                                </tr>
                            ` : ``}
                        </table>
                    </td>
                </tr>
            `
        }
        return str;
    }

    return `

    <table>
        <thead>
            <tr>
                <td>
                    <div class="header-space">&nbsp;</div>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <main class="main-section">
                    ${objective ? `
                        <table class="section objective">
                            <tr>
                                <td>
                                    ${objective}
                                </td>
                            </tr>
                        </table>
                    ` : ``}
                    ${(skills && skills.length > 0) ? `
                    <table class="section skills">
                            <thead>
                                <tr>
                                    <td>
                                        <h2>Skills</h2>
                                    </td>
                                </tr>
                            </thead>
                            <tr class="content-container">
                                ${getSkills()}
                            </tr>
                        </table>
                    ` : ``}

                    ${(workExperience && workExperience.length > 0) ? `
                        <table class="section work-experiences">
                            <thead>
                                <tr>
                                    <td>
                                        <h2>Work Experiences</h2>
                                    </td>
                                </tr>
                            </thead>
                            ${getWorkExperiences()}
                        </table>
                    ` : ``}

                    ${(projects && projects.length > 0) ? `
                        <table class="section projects">
                                <thead>
                                    <tr>
                                        <td>
                                            <h2>Projects</h2>
                                        </td>
                                    </tr>
                                </thead>
                                ${getProjects()}
                            </table>
                    ` : ``}

                        ${(trainingCertifications && trainingCertifications.length > 0) ? `
                            <table class="section certificates">
                                <thead>
                                    <tr>
                                        <td>
                                            <h2>Certificates</h2>
                                        </td>
                                    </tr>
                                </thead>
                                ${getCertificates()}
                        </table>
                        ` : ``}

                        ${(educationDetails && educationDetails.length > 0) ? `
                            <table class="section education">
                                <thead>
                                    <tr>
                                        <td>
                                            <h2>Education</h2>
                                        </td>
                                    </tr>
                                </thead>
                                ${getEducationDetails()}
                            </table>
                        ` : ``}
                    </main>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <div class="footer-space">&nbsp;</div>
                </td>
            </tr>
        </tfoot>
    </table>

    <header class="plr2em pb2em">
        <h1 class="name">${name}</h1>
       ${getHeaderInformation()}
    </header>

    <footer></footer>
    `;
}

exports.getTemplate = (templateDetails, themeColor) => {
    return style(themeColor) + "\n" + html(templateDetails);
}

exports.generator = async (templateDetails, themeColor) => {
    await generatePDF(this.getTemplate(templateDetails, themeColor))
}

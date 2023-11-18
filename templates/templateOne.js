const style = (themeColor = "#324b57") => `
<style>
:root {
  --themeColor: #324b57;
  --headerBackgroundColor: #f2f2f2;
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

.section.skills ul {
  margin: unset;
  padding: unset;
  padding-left: 20px;
}

.section.skills li {
  padding: unset;
}

</style>
`

const html = (templateDetails = {}) => {
    const {objective, educationDetails, skills, workExperience, projects, trainingCertifications} = templateDetails;
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
                                <td class="pb1em">
                                    <ul>
                                        <li>1</li>
                                        <li>2</li>
                                        <li>3</li>
                                        <li>7</li>
                                    </ul>
                                </td>
                                <td class="pb1em">
                                    <ul>
                                        <li>4</li>
                                        <li>5</li>
                                        <li>6</li>
                                        <li>8</li>
                                    </ul>
                                </td>
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
                            <tr class="content-container">
                                <td>
                                    <table class="pb1em">
                                        <tr>
                                            <td class="header">
                                                <strong>Position</strong>, Company name
                                                <div class="align-right float-right">Duration</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>responsibilities</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr class="content-container">
                                <td>
                                    <table class="pb1em">
                                        <tr>
                                            <td class="header">
                                                <strong>Position</strong>, Company name
                                                <div class="align-right float-right">Duration</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>responsibilities</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
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
                                <tr class="content-container">
                                    <td>
                                        <table class="pb1em">
                                            <tr>
                                                <td class="header">
                                                    <strong>Project Name</strong>
                                                    <div class="align-right float-right">Duration</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div>responsibilities</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
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
                            <tr class="content-container">
                                <td>
                                    <table class="pb1em">
                                        <tr>
                                            <td class="header">
                                                <strong>Certifcate Name</strong>
                                                <div class="align-right float-right">Duration</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>responsibilities</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
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
                                <tr class="content-container">
                                    <td>
                                        <table class="pb1em">
                                            <tr>
                                                <td class="header">
                                                    <strong>CourseName</strong>
                                                    <div class="align-right float-right">Duration</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div>institude name</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div>university name</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div>responsibilities</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
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
        <h1 class="name">Harshdeep Singh</h1>
        <div class="header-information item-4">
            <div class="information">1</div>
            <div class="information">2</div>
            <div class="information">3</div>
            <div class="information">4</div>
        </div>
    </header>

    <footer></footer>
    `;
}

exports.getTemplate = (templateDetails, themeColor) => {
    return style(themeColor) + "\n" + html();
}

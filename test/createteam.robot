*** Settings ***
Library                ExtendedSelenium2Library
Library                BuiltIn
Library                String

Suite Teardown         Close Browser


*** Variable ***
${url}                 http://localhost:4200
${title}               raburabu-web
${input_user}          //*[@name="username"]
${input_pass}          //*[@name="password"]
${btn_login}           //*[@name="btn-login"]
${btn_create}          //*[@name="btnCreate"]
${user}                usr1
${password}            test


*** Test Cases ***
ทำการ Login ด้วย username และ password ถูกต้อง
    Set Selenium Speed                                     .3
    Open Browser                                           ${url}                      chrome
    Element Should Be Disabled                             //*[@name="btn-login"]
    Input Text                                             //*[@name="username"]       ${user}
    Input Text                                             //*[@name="password"]       ${password}
    Element Should Be Enabled                              //*[@name="btn-login"]
    Click Element                                          //*[@name="btn-login"]
    ตรวจสอบเข้าถึงหน้า Home เมื่อ Login สำเร็จ
เลือก เริ่มธุรกิจ กับ raburabu ด้วยชื่อทีมที่ซ้ำกับทีมที่มีอยู่แล้ว
    Click Element                                          //*[@name="btnCreate"]
    Input Text                                             //*[@name="inputKeyCodeTeam"]    K01
    Input Text                                             //*[@name="inputKeyNameTeam"]    ขานดี
    Input Text                                             //*[@name="textAreaDetailTeam"]  ตลอดกาลนาน
    Click Element                                          //*[@name="btnConfrim"]

เลือก เริ่มธุรกิจ กับ raburabu ด้วยชื่อทีมที่ถูกต้องตามเงื่อนไข
    Input Text                                             //*[@name="inputKeyCodeTeam"]    K02
    Input Text                                             //*[@name="inputKeyNameTeam"]    ขายดีๆ
    Click Element                                          //*[@name="btnConfrim"]


*** Keywords ***
ตรวจสอบเข้าถึงหน้า Home เมื่อ Login สำเร็จ
    Element Should Contain                                 //*[@name="btnCreate"]      เริ่มธุรกิจ
    Element Should Contain                                 //*[@name="btnJoin"]        เข้าร่วมธุรกิจ
    
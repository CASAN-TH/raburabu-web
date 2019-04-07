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
ทำการ อนุญาติให้ ผู้ใช้สอง เข้าร่วทีม
    Click Element                                           //*[@id="btnApprove-ผู้ใช้สอง"]
    Element Should Contain                                  //*[@name="Title"]      ยืนยันการเข้าร่วมทีม
    Click Element                                           //*[@name="btnConfrim"]
*** Keywords ***
ตรวจสอบเข้าถึงหน้า Home เมื่อ Login สำเร็จ
    Element Should Contain                                 //*[@name="btnCreate"]      เริ่มธุรกิจ
    Element Should Contain                                 //*[@name="btnJoin"]        เข้าร่วมธุรกิจ
    
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
ไม่ใส่ username และ password
    Set Selenium Speed                                     .5
    Open Browser                                           ${url}                      chrome
    Element Should Be Disabled                             //*[@name="btn-login"]
ใส่ username แต่ไม่ใส่ password
    Input Text                                             //*[@name="username"]       ${user}
    Element Should Be Disabled                             //*[@name="btn-login"]
ไม่ใส่ username แต่ใส่ password
    Input Text                                             //*[@name="username"]       ${empty}
    Input Text                                             //*[@name="password"]       ${password}
ใส่ username และ password ผิดทั้งคู่
    Input Text                                             //*[@name="username"]       x
    Input Text                                             //*[@name="password"]       x
    Element Should Be Enabled                              //*[@name="btn-login"]
    Click Element                                          //*[@name="btn-login"]
    Wait Until Angular Ready
ใส่ username ผิด แต่ใส่ password ถูก
    Input Text                                             //*[@name="username"]       x
    Input Text                                             //*[@name="password"]       ${password}
    Element Should Be Enabled                              //*[@name="btn-login"]
    Click Element                                          //*[@name="btn-login"]
    Wait Until Angular Ready
ใส่ username ถูก แต่ใส่ password ผิด
    Input Text                                             //*[@name="username"]       ${user}
    Input Text                                             //*[@name="password"]       x
    Element Should Be Enabled                              //*[@name="btn-login"]
    Click Element                                          //*[@name="btn-login"]
    Wait Until Angular Ready
ใส่ username และ password ถูกต้อง
    Input Text                                             //*[@name="username"]       ${user}
    Input Text                                             //*[@name="password"]       ${password}
    Element Should Be Enabled                              //*[@name="btn-login"]
    Click Element                                          //*[@name="btn-login"]
    ตรวจสอบเข้าถึงหน้า Home เมื่อ Login สำเร็จ


*** Keywords ***
ตรวจสอบเข้าถึงหน้า Home เมื่อ Login สำเร็จ
    Element Should Contain                                 //*[@name="btnCreate"]      เริ่มธุรกิจ
    Element Should Contain                                 //*[@name="btnJoin"]        เข้าร่วมธุรกิจ
    
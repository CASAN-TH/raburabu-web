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
${user}                admin
${password}            admin1234


*** Test Cases ***
แอดมินทำการ Login ด้วย username และ password ถูกต้อง
    Set Selenium Speed                                     .3
    Open Browser                                           ${url}                      chrome
    Element Should Be Disabled                             //*[@name="btn-login"]
    Input Text                                             //*[@name="username"]       ${user}
    Input Text                                             //*[@name="password"]       ${password}
    Element Should Be Enabled                              //*[@name="btn-login"]
    Click Element                                          //*[@name="btn-login"]
    ตรวจสอบเข้าถึงหน้า Home เมื่อ Login สำเร็จ
แอดมิน อนุมัติ ทีม K02
    Click Element                                          //*[@id="btnApprove-K02"]
    Click Element                                          //*[@name="btnConfrim"]

*** Keywords ***
ตรวจสอบเข้าถึงหน้า Home เมื่อ Login สำเร็จ
    Element Should Contain                                 //*[@id="codeteam-K02"]        K02
    Element Should Contain                                 //*[@id="btnApprove-K02"]        อนุมัติ
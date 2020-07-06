const React = require('react');
const App = require('./../ui')
const {mount, configure, shallow} = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const renderer = require('react-test-renderer');
const new_cmd_soap_msg = require('./../new_cmd_soap_msg');


test("Test GetCertificate", async () => {
    const componentApp = renderer.create(<App operation="GetCertificate" user="351 918133837" prod={true}/> );
    const result = await new_cmd_soap_msg.getcertificate('351 918133837', 'YjgyNjM1OWMtMDZmOC00MjVlLThlYzMtNTBhOTdhNDE4OTE2', true)
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
    console.log(result);
});

test("Test CCMovelSign", async () => {
    const componentApp = renderer.create(<App operation="CCMovelSign" user="351 918133837" docName="xyz.pdf" pin={24142}/>);
    const result = await new_cmd_soap_msg.ccmovelsign('351 918133837', 'YjgyNjM1OWMtMDZmOC00MjVlLThlYzMtNTBhOTdhNDE4OTE2', "xyz.pdf", undefined ,24142)
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
    console.log(result);
});


test("Test CCMovelMultSignRequest", async () => {
    const componentApp = renderer.create(<App operation="CCMovelMultSignRequest" user="351 918133837" docNames="xyz.pdf,yyy.pdf" pin={24142}/>);
    const result = await new_cmd_soap_msg.ccmovelmultiplesign('351 918133837', 'YjgyNjM1OWMtMDZmOC00MjVlLThlYzMtNTBhOTdhNDE4OTE2', ["xyz.pdf","yyy.pdf"],24142)
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
    console.log(result);
});

test("Test GetCertificate_erro", () => {
    const componentApp = renderer.create(<App operation="GetCertificate" user=""/>);
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Test CCMovelSign_erro", () => {
    const componentApp = renderer.create(<App operation="CCMovelSign" />);
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
});


test("Test CCMovelMultSignRequest_erro", () => {
    const componentApp = renderer.create(<App operation="CCMovelMultSignRequest" />);
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Test ValidateOTP_erro", () => {
    const componentApp = renderer.create(<App operation="ValidateOTP"/>);
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
});


/*test("Test ValidateOTP", async () => {
    const componentApp = renderer.create(<App operation="ValidateOTP" processId={42111} code={21342}/>);
    const result = await new_cmd_soap_msg.validate_otp(21342,42111,'YjgyNjM1OWMtMDZmOC00MjVlLThlYzMtNTBhOTdhNDE4OTE2')
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
    console.log(result);
});*/

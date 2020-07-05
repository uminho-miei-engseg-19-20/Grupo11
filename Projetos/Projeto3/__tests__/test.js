const React = require('react');
const App = require('./../ui')
const renderer = require('react-test-renderer');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
test('should add two numbers', () => {
    const componentApp = renderer.create(
        <App operation="GetCertificate" user="351 918133837"/>,
        sleep(2000)
    );
   
    let tree = componentApp.toJSON();
    expect(tree).toMatchSnapshot();
});
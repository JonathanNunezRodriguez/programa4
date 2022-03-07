//.d=2
import Prompt from './Prompt';
import SimpsonMethod from './SimpsonMethod';

//.d=3

//.b=43
const main = async () => {

    const prompter = new Prompt();

    //.d=9

    let x: string | number = '';

    let dof: string | number = '';

    let repeat = true;

    while (repeat) {

        x = await prompter.getVar();

        x = Number(x);

        if (isNaN(x)) {
            
            console.log('Se introdujo un caracter en vez de un numero real mayor o igual a 0')
            
        } else if (x < 0) {

            console.log('Se introdujo un numero menor a 0 en vez de un numero real mayor o igual a 0')

        } else {

            repeat = false;
        }
        
    }

    repeat = true;

    while (repeat) {

        dof = await prompter.getVar();

        dof = parseInt(dof);

        if (isNaN(dof)) {
            
            console.log('Se introdujo un caracter en vez de un numero entero mayor o igual a 0')
            
        } else if (x < 0) {

            console.log('Se introdujo un numero menor a 0 en vez de un numero entero mayor o igual a 0')

        } else {

            repeat = false;
        }
    }

    const newIntegral = new SimpsonMethod(x as number, dof as number);

    newIntegral.calculateIntegral();

    newIntegral.printResults();

    //.d=17

    //.d=4

    await prompter.getVar('Press enter to exit...');
    
    prompter.closePrompt();
};

main();

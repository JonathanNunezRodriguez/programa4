class SimpsonMethod {
    
    x: number;

    dof: number;

    numSegments: number;

    error: number;

    p: number;

    constructor(x: number, dof: number, numSegments = 2, error = 0.0000001) {

        this.x = x;

        this.dof = dof;

        this.numSegments = numSegments;

        this.error = error;
    }

    calculateIntegral = () => {

        let isGreaterThanError = true;
        
        let firstP = this.#calculateP();
        
        while (isGreaterThanError) {
            
            this.numSegments *= 2;

            const latestP = this.#calculateP();

            isGreaterThanError = latestP - firstP > this.error;

            firstP = latestP;
        }

        this.p = firstP;
    }

    #calculateP = (): number => {

        const w = this.x / this.numSegments;

        const firstTerm = this.#calculateF(0);

        let secondTerm = 0;

        for (let i = 1; i <= this.numSegments - 1; i += 2) {

            secondTerm += 4 * this.#calculateF(i * w);
        }

        let thirdTerm = 0;

        for (let i = 2; i <= this.numSegments - 2; i+= 2) {

            thirdTerm += 2 * this.#calculateF(i * w)
        }

        const fourthTerm = this.#calculateF(this.x);

        const p = (w / 3) * (firstTerm + secondTerm + thirdTerm + fourthTerm);

        return p;
    }

    #calculateF = (x: number): number => {

        const numerator = this.#calculateGamma((this.dof + 1) / 2);
        
        const denomitaor = Math.sqrt((this.dof * Math.PI)) * this.#calculateGamma(this.dof / 2);

        const base = 1 + ((Math.pow(x, 2)) / this.dof);

        const exponent = (this.dof + 1) / 2 * -1;
        
        const lastTerm = Math.pow(base, exponent);

        return numerator / denomitaor * lastTerm;
    }

    #calculateGamma = (x: number): number => {
        
        if (x === 1) return 1;
        
        if (x === 0.5) return Math.sqrt(Math.PI);

        return (x - 1) * this.#calculateGamma(x - 1);
    }

    printResults = () => {

        console.log(`x\t= ${this.x.toFixed(5)}`);

        console.log(`dof\t= ${this.dof}`);

        console.log(`p\t= ${this.p.toString().substring(0,7)}`);        
    }
}

export default SimpsonMethod;
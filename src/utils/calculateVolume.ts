
export const calculateVolume = ({ d1, d2, d3, d4, meters }: { d1: string, d2: string, d3: string, d4: string, meters: string }) => {
    const pi = Math.PI;
    const averageD1D2 = (parseFloat(d1) + parseFloat(d2)) / 2;
    const averageD3D4 = (parseFloat(d3) + parseFloat(d4)) / 2;
    const result = ((((Math.pow(averageD1D2, 2) * (pi / 4)) + (Math.pow(averageD3D4, 2) * (pi / 4))) / 2) * parseFloat(meters));
    return result
}
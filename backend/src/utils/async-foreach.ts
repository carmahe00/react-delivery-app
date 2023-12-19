const asyncForEach = async function (array: Express.Multer.File[] | {
    [fieldname: string]: Express.Multer.File[];
}, callback: Function) {
    if (Array.isArray(array))
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
}

export default asyncForEach
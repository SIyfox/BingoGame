import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import PhotoLoader from "../components/PhotoLoader";
const BingoPage = () => {

    let BingoArray = [
        {x:0,y:0,content:"крыса",info:`"КРЫСА"`,color:"#ECA425",checked:false,selected:false,font:20},
        {x:1,y:0,content:"3D",info:`"Я заапгрейдился до 3д"`,color:"#4F832E",checked:false,selected:false,font:20},
        {x:2,y:0,content:"не поеду",info:`"В тот день я чуть не умер..."`,color:"#96CED1",checked:false,selected:false,font:20},
        {x:3,y:0,content:"мак",info:`photoEx`,color:"#D197BB",checked:false,selected:false,font:20},

        {x:0,y:1,content:"не токсик",info:`"Вылечил токсичность"`,color:"#96CED1",checked:false,selected:false,font:18},
        {x:1,y:1,content:"каршеринг",info:`"Тачка 10 на 10"`,color:"#D197BB",checked:false,selected:false,font:12},
        {x:2,y:1,content:"аыаы",info:`"АЫАЫАЫАЫАЫАЫАЫ"`,color:"#ECA425",checked:false,selected:false,font:20},
        {x:3,y:1,content:"редко в дискорде",info:`"Я редко захожу в дискорд"`,color:"#4F832E",checked:false,selected:false,font:12},

        {x:0,y:2,content:"переехал",info:`"Я переехал"`,color:"#4F832E",checked:false,selected:false,font:14},
        {x:1,y:2,content:"не играю",info:`"Пацаны я больше не играю"`,color:"#96CED1",checked:false,selected:false,font:20},
        {x:2,y:2,content:"офис до поздна",info:`"В офисе до вечера"`,color:"#D197BB",checked:false,selected:false,font:15},
        {x:3,y:2,content:"заруинил",info:`"В этот раз я заруинил"`,color:"#ECA425",checked:false,selected:false,font:14},

        {x:0,y:3,content:"яндекс столовка",info:`"800 рублей на еду каждый день"`,color:"#D197BB",checked:false,selected:false,font:14},
        {x:1,y:3,content:"майнкрафт",info:`"Майнкрафт моя прошлая жизнь"`,color:"#ECA425",checked:false,selected:false,font:12},
        {x:2,y:3,content:"осталвил комп",info:`"Оставил игровой комп у родителей"`,color:"#4F832E",checked:false,selected:false,font:14},
        {x:3,y:3,content:"не пью",info:`"Обычно я не пью"`,color:"#96CED1",checked:false,selected:false,font:24},
    ]

    let BingoArrayChecked = [

        {x:0,y:0,checked:false},
        {x:1,y:0,checked:false},
        {x:2,y:0,checked:false},
        {x:3,y:0,checked:false},

        {x:0,y:1,checked:false},
        {x:1,y:1,checked:false},
        {x:2,y:1,checked:false},
        {x:3,y:1,checked:false},

        {x:0,y:2,checked:false},
        {x:1,y:2,checked:false},
        {x:2,y:2,checked:false},
        {x:3,y:2,checked:false},

        {x:0,y:3,checked:false},
        {x:1,y:3,checked:false},
        {x:2,y:3,checked:false},
        {x:3,y:3,checked:false}
    ]
    const cookies = new Cookies();

    const  [initialStart,setInitialStart] = useState(true)
    const [BingoArrayState,setBingoArrayState] = useState(BingoArray)
    const [itemInfoState,setItemInfoState] = useState("")

    const [row1State,setRow1State] = useState(false)
    const [row2State,setRow2State] = useState(false)
    const [row3State,setRow3State] = useState(false)
    const [row4State,setRow4State] = useState(false)

    const [col1State,setCol1State] = useState(false)
    const [col2State,setCol2State] = useState(false)
    const [col3State,setCol3State] = useState(false)
    const [col4State,setCol4State] = useState(false)

    const [colorCheck0,setColorCheck0] = useState(false)
    const [colorCheck1,setColorCheck1] = useState(false)
    const [colorCheck2,setColorCheck2] = useState(false)
    const [colorCheck3,setColorCheck3] = useState(false)

    const [seeButton,setSeeButton] = useState(true)
    const [contentOn,setContentOn] = useState(false)

    useEffect(() => {

        if(initialStart)
        {
            let check = cookies.get('BingoData')

            if(check==null)
            {
                cookies.set('BingoData', BingoArrayChecked, { path: '/' });
            }
            else
            {
                let newArr = []
                BingoArray.forEach(item=>{
                    item.checked = check[check.findIndex(s=>(s.x===item.x)&(s.y===item.y))].checked
                    newArr.push(item)
                })

                LineCheck(newArr)
            }
            setInitialStart(false)
        }
        setContentOn(true)
    });
    function BingoItemClick(itemNew){
        const newArray = BingoArrayState.map(item => {
            if (item===itemNew) {
                if(item.selected)
                {
                    if(item.checked)
                    {
                        return {
                            ...item,
                            checked: false,
                        };
                    }
                    else
                    {
                        return {
                            ...item,
                            checked: true,
                        };
                    }
                }

                setItemInfoState(item.info)

                return {
                    ...item,
                    selected: true,

                };
            } else {
                return {
                    ...item,
                    selected: false,
                };
            }
        });
        // Re-render with the new array
        LineCheck(newArray)
        setBingoArrayState(newArray);
        const newArrayChecked = BingoArrayChecked.map(item => {

                        return {
                            ...item,
                            checked: newArray[newArray.findIndex(s=>(s.x===item.x)&(s.y===item.y))].checked,
                        };

        });
        cookies.set('BingoData', newArrayChecked, { path: '/' });
    }

    function LineCheck(array){
        let f = true;
        array.forEach(item=>{
            if(item.y===0)
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setRow1State(f)
        f = true
        array.forEach(item=>{
            if(item.y===1)
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setRow2State(f)
        f = true
        array.forEach(item=>{
            if(item.y===2)
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setRow3State(f)
        f = true
        array.forEach(item=>{
            if(item.y===3)
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setRow4State(f)
        f = true

        array.forEach(item=>{
            if(item.x===0)
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setCol1State(f)
        f = true
        array.forEach(item=>{
            if(item.x===1)
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setCol2State(f)
        f = true
        array.forEach(item=>{
            if(item.x===2)
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setCol3State(f)
        f = true
        array.forEach(item=>{
            if(item.x===3)
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setCol4State(f)
        f = true



        array.forEach(item=>{
            if(item.color==='#4F832E')
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setColorCheck0(f)
        f = true
        array.forEach(item=>{
            if(item.color==='#ECA425')
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setColorCheck1(f)
        f = true
        array.forEach(item=>{
            if(item.color==='#D197BB')
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setColorCheck2(f)
        f = true
        array.forEach(item=>{
            if(item.color==='#96CED1')
            {
                if(!item.checked)
                {
                    f = false
                    return;
                }
            }
        })
        setColorCheck3(f)
        f = true



    }

    function SeeButtonClick(){

        if(seeButton){
            setSeeButton(false)
        }
        else
        {
            setSeeButton(true)
        }
    }
    function Unselect(){
        const newArray = BingoArrayState.map(item => {

            return {
                ...item,
                selected: false,
            };

        });
        // Re-render with the new array

        setBingoArrayState(newArray);
          setItemInfoState("")
    }

    function ResetBingoContent(){
        cookies.set('BingoData', BingoArrayChecked, { path: '/' });
        setBingoArrayState(BingoArray)
        LineCheck(BingoArray)
        setSeeButton(true)
    }
    return (
        <div className={'app__layout'}>
            <div className={` app__content ${contentOn?"app__intro_animation_op":""} `} >
                <div className={` ${contentOn?"app__content_animation":"app__content_op"}`}>
                    <div className={'app__header'} >
                        ШУРУП БИНГО
                    </div>
                    <div className={'app__info'}>
                        <div className={'app__info_content'}>
                            <div>
                                {
                                    itemInfoState.includes('photoEx')?
                                        <PhotoLoader photo={require('../assets/mac.png')}/>
                                        :
                                        <div>
                                            {itemInfoState}
                                            <div className={`${itemInfoState==='"Майнкрафт моя прошлая жизнь"'?"minecraft_off":"minecraft_on"}`}>
                                                <img src={require('../assets/mincraft.png')} alt={"minecraft"}/>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className={"app__info_see_button"} >
                            <div className={seeButton?"app__info_see_button_on":"app__info_see_button_off"} style={{position:"absolute"}}  onClick={(e) => {SeeButtonClick();}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                    <path
                                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                </svg>
                            </div>
                            <div className={!seeButton?"app__info_see_button_on":"app__info_see_button_off"} style={{position:"absolute"}}  onClick={(e) => {SeeButtonClick();}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-eye" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                    <path
                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={'app__bingo'}>
                        {BingoArrayState.map(item =>
                            <div key={`${item.x}|${item.y}`} className={`app__bingo_item ${item.selected?"app__bingo_item_selected":""}`} onClick={(e) => {BingoItemClick(item);}}>
                                <div className={`app__bingo_item_content ${(!item.checked&&!seeButton)?"seeButtonChecked":""}`} style={{color:`${item.color}`,fontSize:item.font}}>
                                    {item.content}
                                </div>
                                <div className={`app__bingo_item_checked ${item.checked?"":"app__bingo_item_unchecked"}`} />
                            </div>
                        )}
                        <div className={`app__bingo_lines_horizontal `}>
                            <div className={`horizontal_line ${row1State?"horizontal_line_active":""} ${seeButton?"":"app__bingo_lines_fade"}`} style={{marginTop:11}}/>
                            <div className={`horizontal_line ${row2State?"horizontal_line_active":""} ${seeButton?"":"app__bingo_lines_fade"}`} style={{marginTop:9}}/>
                            <div className={`horizontal_line ${row3State?"horizontal_line_active":""} ${seeButton?"":"app__bingo_lines_fade"}`} style={{marginTop:8}}/>
                            <div className={`horizontal_line ${row4State?"horizontal_line_active":""} ${seeButton?"":"app__bingo_lines_fade"}`} style={{marginTop:7}}/>
                        </div>
                        <div className={`app__bingo_lines_vertical`} >
                            <div className={`vertical_line ${col1State?"vertical_line_active":""} ${seeButton?"":"app__bingo_lines_fade"}`} style={{marginLeft:11}}/>
                            <div className={`vertical_line ${col2State?"vertical_line_active":""} ${seeButton?"":"app__bingo_lines_fade"}`} style={{marginLeft:9}}/>
                            <div className={`vertical_line ${col3State?"vertical_line_active":""} ${seeButton?"":"app__bingo_lines_fade"}`} style={{marginLeft:8}}/>
                            <div className={`vertical_line ${col4State?"vertical_line_active":""} ${seeButton?"":"app__bingo_lines_fade"}`} style={{marginLeft:7}}/>
                        </div>
                        <div className={'reset_button'}  onClick={(e) => {ResetBingoContent();}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                 className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                <path
                                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                                <path
                                    d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                            </svg>
                        </div>
                    </div>
                    <div className={'app__footer_top'}>
                        <div style={{height:17,width:17,background:'#4F832E',margin:3}}/>
                        <div style={{height:17,width:17,background:'#ECA425',margin:3}}/>
                        <div style={{height:17,width:17,background:'#D197BB',margin:3}}/>
                        <div style={{height:17,width:17,background:'#96CED1',margin:3}}/>
                    </div>
                    <div className={'app__footer_bottom'}>
                        <div className={`color_check_border`}> <div className={`color_check ${colorCheck0?"color_check_visible":""}`} style={{background:'#4F832E'}}/> </div>
                        <div className={`color_check_border`}> <div className={`color_check ${colorCheck1?"color_check_visible":""}`} style={{background:'#ECA425'}}/> </div>
                        <div className={`color_check_border`}> <div className={`color_check ${colorCheck2?"color_check_visible":""}`} style={{background:'#D197BB'}}/> </div>
                        <div className={`color_check_border`}> <div className={`color_check ${colorCheck3?"color_check_visible":""}`} style={{background:'#96CED1'}}/> </div>
                    </div>
                </div>
                <div className={`app_intro ${contentOn?"app__intro_animation":""}`}  onClick={(e) => {Unselect();}}>
                    <div className={`app__header  `} >
                        ШУРУП БИНГО
                    </div>
                </div>
            </div>

        </div>
    );
}
export default BingoPage;
import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import './user.css';
import browserCookie from 'browser-cookies';

@connect(
    state=>state.user
)
class User extends React.Component{
   constructor(props){
       super(props);
       this.logout = this.logout.bind(this)
   }
    logout(){       
        const alert = Modal.alert;
        alert('注销', '确定退出登录吗？', [
            {text:'取消', onPress:() => console.log('cancel') },
            { text:'确认', onPress: () => {
                browserCookie.erase('userId');
                // this.props.logoutSubmit()
            } }
        ])
    }
    
    render(){
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            <div>
                <Result 
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt='' />}
                    title={props.user}
                    message={props.type==='boss' ? props.company : null}
                />
                <List renderHeader={()=>'简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List style={{zIndex:'100'}}>
                    <Item onClick={this.logout}>
                        退出登录
                    </Item>
                </List>
            </div>
        ) : null;
    }
}

export default User;
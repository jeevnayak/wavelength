import gql from 'graphql-tag';
import React, {
  Component,
} from 'react';
import {
  graphql,
} from 'react-apollo';
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  Row,
  RowTitle,
  Screen,
  UserPicture,
} from '../ui/Elements';
import GameScreen from './GameScreen';
import NewGameScreen from './NewGameScreen';
import {
  getUserStore,
} from '../model/store/UserStore';

class MainScreen extends Component {
  render() {
    if (this.props.loading) {
      console.log("loading");
      return <Text>Loading...</Text>;
    }
    console.log("done");

    const logOut = getUserStore().clearCurrentUser.bind(getUserStore());
    // let dataSource = new ListView.DataSource({
    //   rowHasChanged: (game1, game2) => game1.id !== game2.id
    // });
    // dataSource = dataSource.cloneWithRows(getGameStore().getGames());
    // let listView = null;
    // if (dataSource.getRowCount() > 0) {
    //   listView = <ListView
    //     dataSource={dataSource}
    //     renderRow={(game) => this.renderGameRow_(game)} />;
    // }

    return (
      <Screen>
        <Text>{this.props.currentUser.name} is logged in!</Text>
        <TouchableHighlight onPress={() => this.onPressNewGame_()}>
          <Text>New game</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={logOut}>
          <Text>Log out</Text>
        </TouchableHighlight>
      </Screen>
    );
  }

  renderGameRow_(game) {
    return <Row onPress={() => this.onPressGameRow_(game)}>
      <UserPicture user={game.getPartner()} />
      <RowTitle text={game.getPartner().name} />
    </Row>;
  }

  onPressGameRow_(game) {
    this.props.navigator.push({
      component: GameScreen,
      props: {game: game}
    });
  }

  onPressNewGame_() {
    this.props.navigator.push({component: NewGameScreen});
  }
}

const query = gql`
  query query($userId: String!) {
    user(id: $userId) {
      id
      name
      firstName
      lastName
      fbToken
    }
  }
`;

export default graphql(query, {
  options: ({ currentUserId }) => ({
    variables: {
      userId: currentUserId
    }
  }),
  props: ({ ownProps, data: { loading, user, refetch } }) => ({
    loading: loading,
    currentUser: user,
  }),
})(MainScreen);